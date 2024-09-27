import React from "react";

const PriceChart = (props) => {
  
  const markup = {__html: '<iframe id="dextools-widget-elephant" title="DEXTools Trading Chart" width="100%" height="400" src="https://www.dextools.io/widget-chart/en/bnb/pe-light/0x1cea83ec5e48d9157fcae27a19807bef79195ce1?theme=dark&chartType=4&chartResolution=30&drawingToolbars=false"></iframe>'}; 
  const bnbChart = {__html: '<iframe id="dextools-widget-trunk" title="DEXTools Trading Chart" width="100%" height="400" src="https://www.dextools.io/widget-chart/en/bnb/pe-light/0x58f876857a02d6762e0101bb5c46a8c1ed44dc16?theme=dark&chartType=4&chartResolution=30&drawingToolbars=false"></iframe>'}
  const trunkChart = { __html: `<iframe id="dextools-widget-bnb"
    title="DEXTools Trading Chart"
    width="100%" height="400"
    src="https://www.dextools.io/widget-chart/en/bnb/pe-light/0xf15a72b15fc4caed6fadb1ba7347f6ccd1e0aede?theme=dark&chartType=45&chartResolution=30&drawingToolbars=false"></iframe> 
  `}
  return (
      <div className="iframe-chart">
        <div dangerouslySetInnerHTML={ markup } />
        {true && <div dangerouslySetInnerHTML={ trunkChart } />}
        {true && <div dangerouslySetInnerHTML={ bnbChart } />}
      
      </div>
    );
  
};


export default PriceChart;