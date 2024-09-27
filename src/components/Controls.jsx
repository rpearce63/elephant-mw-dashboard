import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default ({ handleSwitch, backupData, toggleNfts, toggleTrunk, toggleTrumpet, toggleStampede, toggleFutures, toggleRedeem, toggleUSDC, toggleBUSD, configs }) => {
  return (
    <div className="controls">
      {true && (
        <>
          <span className="ml-1 inter-bold">EM</span>
          <Switch onChange={handleSwitch} />
          <span className="inter-bold mr-1">USD</span>
        </>
      )}

      <Button
        variant="outlined"
        size="small"
        color="success"
        startIcon={<FileDownloadIcon color="success" />}
        onClick={backupData}
        sx={{ marginRight: "1em" }}
      >
        Backup
      </Button>

      <div style={{marginLeft: "1em"}}>
        
        {true && (
          <FormControlLabel
            control={<Checkbox checked={configs.includeTrunk} onChange={toggleTrunk} size="small"/>}
            label="Trunk"
          />
        )}
        {true && (
          <FormControlLabel
            control={<Checkbox  checked={configs.includeTrumpet} onChange={toggleTrumpet} size="small"/>}
            label="Trumpet"
          />
        )}
        {false && (
          <FormControlLabel
            control={<Checkbox checked={configs.includeStampede} onChange={toggleStampede} size="small"/>}
            label="Stampede"
          />
        )}
        {true && (
          <FormControlLabel
            control={<Checkbox checked={configs.includeFutures} onChange={toggleFutures} size="small"/>}
            label="Futures"
          />
        )}
        {false && (
          <FormControlLabel
            control={<Checkbox checked={configs.includeRedeem} onChange={toggleRedeem} size="small"/>}
            label="Redemption Queue"
          />
        )}
        {true && <FormControlLabel
          control={<Checkbox checked={configs.includeNfts} onChange={toggleNfts} size="small" sx={{fontSize: ".8rem"}}/>}
          label="NFTs"
        />}
        {true && <FormControlLabel
          control={<Checkbox checked={configs.includeUSDC} onChange={toggleUSDC} size="small" sx={{fontSize: ".8rem"}}/>}
          label="USDC"
        />}
        {true && <FormControlLabel
          control={<Checkbox checked={configs.includeBUSD} onChange={toggleBUSD} size="small" sx={{fontSize: ".8rem"}}/>}
          label="BUSD"
        />}
      </div>
    </div>
  );
};
