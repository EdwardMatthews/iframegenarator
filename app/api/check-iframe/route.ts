import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { url, origin } = await request.json();
    
    if (!url || !origin) {
      return NextResponse.json({ 
        allowed: false, 
        reason: 'missing-parameters' 
      });
    }

    // 验证URL格式
    let targetUrl;
    try {
      targetUrl = new URL(url);
    } catch (e) {
      return NextResponse.json({ 
        allowed: false, 
        reason: 'invalid-url' 
      });
    }

    // 发送请求检查头信息
    let response;
    try {
      response = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'iframe-checker/1.0',
        },
      });
    } catch (error) {
      // 如果HEAD请求失败，尝试GET请求
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'iframe-checker/1.0',
          },
        });
      } catch (error) {
        return NextResponse.json({ 
          allowed: false, 
          reason: 'network-error' 
        });
      }
    }

    // 检查响应状态
    if (!response.ok) {
      return NextResponse.json({ 
        allowed: false, 
        reason: `http-${response.status}` 
      });
    }

    // 获取并检查安全头信息
    const xFrameOptions = response.headers.get('x-frame-options');
    const csp = response.headers.get('content-security-policy');
    
    // 检查 X-Frame-Options
    if (xFrameOptions) {
      const xfo = xFrameOptions.toLowerCase();
      
      if (xfo === 'deny') {
        return NextResponse.json({ 
          allowed: false, 
          reason: 'xfo-deny' 
        });
      }
      
      if (xfo === 'sameorigin' && new URL(origin).hostname !== targetUrl.hostname) {
        return NextResponse.json({ 
          allowed: false, 
          reason: 'xfo-sameorigin' 
        });
      }
      
      if (xfo.startsWith('allow-from')) {
        const allowedOrigin = xfo.split(' ')[1];
        if (allowedOrigin && !origin.includes(allowedOrigin)) {
          return NextResponse.json({ 
            allowed: false, 
            reason: 'xfo-allow-from' 
          });
        }
      }
    }

    // 检查 Content-Security-Policy
    if (csp) {
      const directives = csp.split(';').map(d => d.trim());
      const frameAncestors = directives.find(d => 
        d.startsWith('frame-ancestors'));

      if (frameAncestors) {
        const [_, ...values] = frameAncestors.split(' ');
        
        // 如果明确设置了 'none'
        if (values.includes("'none'")) {
          return NextResponse.json({ 
            allowed: false, 
            reason: 'csp-none' 
          });
        }

        // 如果只有 'self'
        if (values.length === 1 && values[0] === "'self'" && 
            new URL(origin).hostname !== targetUrl.hostname) {
          return NextResponse.json({ 
            allowed: false, 
            reason: 'csp-self' 
          });
        }

        // 如果有具体的域名限制
        if (!values.includes('*')) {
          const allowed = values.some(value => {
            if (value === "'self'") {
              return new URL(origin).hostname === targetUrl.hostname;
            }
            // 移除引号并检查域名匹配
            const domain = value.replace(/['"]/g, '');
            return origin.includes(domain) || domain.includes(origin);
          });

          if (!allowed) {
            return NextResponse.json({ 
              allowed: false, 
              reason: 'csp-domain' 
            });
          }
        }
      }
    }

    // 默认情况：如果没有限制性的头信息，则允许嵌入
    return NextResponse.json({ 
      allowed: true,
      reason: 'no-restrictions'
    });
    
  } catch (error) {
    console.error('Error checking iframe permissions:', error);
    return NextResponse.json({ 
      allowed: false, 
      reason: error instanceof Error ? error.message : 'unknown-error',
      detail: error instanceof Error ? error.stack : undefined
    });
  }
}