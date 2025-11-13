import { useNavigate } from "react-router-dom";

interface LogoProps {
  className?: string;
  showText?: boolean;
  onClick?: () => void;
}

export const Logo = ({ className = "", showText = true, onClick }: LogoProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/");
    }
  };

  return (
    <div 
      className={`flex items-center gap-3 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {/* Logo Image */}
      <img
        src="/logo.png"
        alt="riAI Capital Logo"
        className="h-8 w-auto flex-shrink-0"
      />

      {/* Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-gold font-bold text-lg">
            <span className="text-sm">ri</span>
            <span className="text-base">AI</span>
          </span>
          <span className="text-gold text-sm font-medium">Capital</span>
        </div>
      )}
    </div>
  );
};

