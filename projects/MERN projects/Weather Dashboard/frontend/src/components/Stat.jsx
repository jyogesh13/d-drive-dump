const Stat = ({ label, value }) => {
  return (
    <div className="bg-[#EAE0CF] rounded-lg p-3 text-center">
      <p className="text-xs text-[#547792]">{label}</p>
      <p className="text-sm font-semibold text-[#213448]">{value}</p>
    </div>
  );
};

export default Stat;
