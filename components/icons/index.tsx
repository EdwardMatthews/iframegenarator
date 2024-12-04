export function LogoIcon({ className = "w-8 h-8" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 128 128" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 外框 */}
      <rect 
        x="16" 
        y="16" 
        width="96" 
        height="96" 
        rx="8" 
        stroke="currentColor" 
        strokeWidth="8"
      />
      
      {/* 内框 */}
      <rect 
        x="32" 
        y="32" 
        width="64" 
        height="64" 
        rx="4" 
        fill="currentColor" 
        fillOpacity="0.2"
      />
      
      {/* 网格线 */}
      <path 
        d="M32 48h64M32 80h64M48 32v64M80 32v64" 
        stroke="currentColor" 
        strokeWidth="6"
        strokeLinecap="round"
      />
      
      {/* 装饰点 */}
      <circle cx="48" cy="48" r="4" fill="currentColor" />
      <circle cx="80" cy="48" r="4" fill="currentColor" />
      <circle cx="48" cy="80" r="4" fill="currentColor" />
      <circle cx="80" cy="80" r="4" fill="currentColor" />
    </svg>
  );
} 