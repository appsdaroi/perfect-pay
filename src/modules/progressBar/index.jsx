const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
  };

  const fillerStyles = {
    width: `${completed}%`,
    backgroundColor: bgcolor,
  };

  return (
    <div style={containerStyles} className="w-full mb-5 bg-transparent border-2 border-black rounded-full mx-7 mt-7">
      <div style={fillerStyles} className="relative h-full transition-all rounded-full">
        <span className="absolute -right-2 -top-6 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-sm before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-1 before:h-1 before:w-1 before:bg-black before:-rotate-45 before:transform before:origin-top-left">{`${completed}%`}</span>
      </div>
    </div>
  )
};

export default ProgressBar;
