import { NextResponse } from 'next/server';

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

    // 发送请求检查头信息，设置 redirect: 'follow' 来跟随所有重定向
    let response;
    try {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow', // 跟随所有重定向
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; IframeChecker/1.0)',
        },
      });
      
      // 如果状态码不是成功的范围
      if (!response.ok) {
        return NextResponse.json({ 
          allowed: false, 
          reason: `http-${response.status}`,
          finalUrl: response.url
        });
      }

    } catch (error) {
      console.error('Network error:', error);
      return NextResponse.json({ 
        allowed: false, 
        reason: 'network-error' 
      });
    }

    // 检查最终URL的 X-Frame-Options 头
    const xFrameOptions = response.headers.get('x-frame-options');
    if (xFrameOptions) {
      const value = xFrameOptions.toLowerCase();
      if (value === 'deny' || value === 'sameorigin') {
        return NextResponse.json({ 
          allowed: false, 
          reason: 'x-frame-options',
          header: xFrameOptions,
          finalUrl: response.url
        });
      }
    }

    // 检查最终URL的 Content-Security-Policy 头
    const csp = response.headers.get('content-security-policy');
    if (csp) {
      const framePolicies = [
        'frame-ancestors',
        'frame-src',
        'child-src',
        'default-src'
      ];
      
      // 解析 CSP 指令
      const directives = csp.split(';').map(d => d.trim());
      
      for (const directive of directives) {
        for (const policy of framePolicies) {
          if (directive.startsWith(policy)) {
            const values = directive.split(' ').slice(1);
            
            // 使用最终的URL进行判断
            const finalTargetUrl = new URL(response.url);
            if (values.includes("'none'") || 
                (values.includes("'self'") && !finalTargetUrl.origin.includes(origin))) {
              return NextResponse.json({ 
                allowed: false, 
                reason: 'content-security-policy',
                header: directive,
                finalUrl: response.url
              });
            }
          }
        }
      }
    }

    // 如果没有限制性头信息，则允许嵌入
    return NextResponse.json({ 
      allowed: true,
      finalUrl: response.url  // 返回最终URL
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ 
      allowed: false, 
      reason: 'server-error' 
    });
  }
}