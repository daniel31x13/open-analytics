const ActiveVisitors = ({active}) => {
  return (
  <div className="ActiveVisitors">
      Right now:
      <h2>{active.toString()}</h2>
      Active Users
  </div>
  );
};

export default ActiveVisitors;
