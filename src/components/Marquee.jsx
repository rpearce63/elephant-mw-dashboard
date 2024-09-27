import Marquee from "react-fast-marquee";

export default () => {
  return (
    <Marquee gradient={false} style={{ color: "white" }} pauseOnHover={true}>
      <div className="med-text">
        Play{" "}
        <a 
          href="https://t.me/GNMEbot?start=REF2009646763CA85D"
          target="_blank"
          rel="noreferrer"
        >
          Gnome Miner
        </a>{" "}
        to mine GNME tokens and support the Elephant Money Ecosystem.  
        &nbsp;
      </div>
    </Marquee>
  );
};
