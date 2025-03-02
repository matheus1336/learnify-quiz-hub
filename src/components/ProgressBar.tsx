
interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = Math.ceil((current / total) * 100);
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Questão {current} de {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
