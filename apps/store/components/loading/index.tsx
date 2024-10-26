import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';

type Props = {
  className?: string;
};

const Loading: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <div className={clsx('flex justify-center', className)}>
      <LoadingDots className="h-3 w-3 bg-black dark:bg-white" />
    </div>
  );
};

export default Loading;
