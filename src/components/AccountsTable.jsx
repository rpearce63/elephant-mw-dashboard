import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Switch from "@mui/material/Switch";
import { backupData, readConfig, saveConfig, formatPct, calculateRateLimiterProgress, calculateRateLimiterRate } from "../api/utils";
import {
  getElephantPrice,
  getTrunkPrice,
  getTrumpetPrice,
  getBnbPrice,
  calculateStrategy,
  calculateTotalValue,
  getNFTPrice,
  getFuturesStats,
  getPriceData
} from "../api/elephant";
import ConfirmationDialog from "./ConfirmationDialog";
import Button from "@mui/material/Button";
import Controls from "./Controls";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import PopupHelp from "./PopupHelp";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { AiOutlineDrag } from "react-icons/ai";
import { MdOutlineDragIndicator } from "react-icons/md";

import RewardsTimer from "./RewardsTimer";
import SellTimer from "./SellTimer";
import { Link } from "wouter";
import FuturesLimiterProgress from "./FuturesLimiterProgress";

export default function AccountsTable({ accounts, removeAcct }) {
  const [totals, setTotals] = useState([]);
  const [timers, setTimers] = useState([]);
  const [selected, setSelected] = useState(false);
  const [isBusd, setIsBusd] = useState(false);
  const [elephantPrice, setElephantPrice] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [trunkPrice, setTrunkPrice] = useState(0);
  const [trumpetPrice, setTrumpetPrice] = useState(0);
  const [nftPrice, setNftPrice] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [includeNfts, setIncludeNfts] = useState(true);
  const [includeTrunk, setIncludeTrunk] = useState(true);
  const [includeTrumpet, setIncludeTrumpet] = useState(true);
  const [includeStampede, setIncludeStampede] = useState(false);
  const [includeFutures, setIncludeFutures] = useState(true);
  const [includeRedeem, setIncludeRedeem] = useState(true);
  const [tableData, setTableData] = useState(accounts);
  const [label, setLabel] = useState("");
  const [dailyYield, setDailyYield] = useState(0);
  const [includeUSDC, setIncludeUSDC] = useState(false);
  const [includeBUSD, setIncludeBUSD] = useState(false);

  const getUpdatedElephantPrice = async () => {
    const [
      
      //nftPrice,
      //{ dailyYield },
      prices
    ] = await Promise.all([
      // getElephantPrice(),
      // getTrunkPrice(),
      // getTrumpetPrice(),
      // getBnbPrice(),
      //getNFTPrice(),
      //getFuturesStats(),
      getPriceData()
    ]);
    setDailyYield(prices.dailyYield / 1e18);
    setBnbPrice(prices.bnbPrice);
    setTrumpetPrice(prices.trumpetPrice);
    setElephantPrice(prices.elephantPriceBUSD);
    setTrunkPrice(prices.trunkPrice);
    setNftPrice(prices.nftPrice);
  };

  // const getCurrentBnbPrice = async () => {
  //   const _bnbPrice = await getBnbPrice();
  //   setBnbPrice(_bnbPrice);
  // };

  const setConfigs = async () => {
    const {
      includeNfts = true,
      includeTrunk = true,
      includeTrumpet = true,
      includeStampede = false,
      includeRedeem = false,
      includeFutures = true,
      includeUSDC = false,
      includeBUSD = false,
    } = readConfig();

    setIncludeTrunk(() => includeTrunk);
    setIncludeTrumpet(includeTrumpet);
    setIncludeStampede(false);
    setIncludeRedeem(false);
    setIncludeFutures(includeFutures);
    setIncludeNfts(includeNfts);
    setIncludeUSDC(includeUSDC);
    setIncludeBUSD(includeBUSD);
  };

  useEffect(() => {
    setConfigs();
  }, []);

  useEffect(() => {
    setTableData(accounts);
    getUpdatedElephantPrice();
    //getCurrentBnbPrice();
  }, [accounts]);

  useEffect(() => {
    saveConfig({
      includeNfts,
      includeTrunk,
      includeTrumpet,
      includeStampede,
      includeRedeem,
      includeFutures,
      includeUSDC,
      includeBUSD,
    });
  }, [
    includeNfts,
    includeTrunk,
    includeTrumpet,
    includeStampede,
    includeRedeem,
    includeFutures,
    includeUSDC,
    includeBUSD,
  ]);

  useEffect(() => {
    const balanceTotal = accounts.reduce(
      (total, account) => total + Number(account.elephantBalance),
      0
    );
    const bnbTotal = accounts.reduce(
      (total, account) => total + Number(account.bnbBalance),
      0
    );
    const busdTotal = accounts.reduce(
      (total, account) => total + Number(account.busdBalance),
      0
    );
    const usdcTotal = accounts.reduce(
      (total, account) => total + Number(account.usdcBalance),
      0
    );
    const trunkTotal = accounts.reduce(
      (total, account) => total + Number(account.trunkBalance),
      0
    );
    const pendingAirdropsTotal = accounts.reduce(
      (total, account) => total + Number(account.pendingAirdrops),
      0
    );
    const totalAirdropsTotal = accounts.reduce(
      (total, account) => total + Number(account.totalAirdrops),
      0
    );
    const trumpetTotal = accounts.reduce(
      (total, account) => total + Number(account.trumpetBalance),
      0
    );
    const trumpetValueTotal = accounts.reduce(
      (total, account) => total + Number(account.trumpetValue),
      0
    );
    const stampedeTotal = accounts.reduce(
      (total, account) => total + Number(account.stampedeBalance),
      0
    );
    const stampedeAvailableTotal = accounts.reduce(
      (total, account) => total + Number(account.stampedeAvailable),
      0
    );
    const stampedeRewardsTotal = accounts.reduce(
      (total, account) => total + Number(account.stampedeRewards),
      0
    );
    const redeemPendingTotal = accounts.reduce(
      (total, account) => total + Number(account.redeemPending),
      0
    );
    const futuresTotal = accounts.reduce(
      (total, account) => total + Number(account.futuresCurrentBalance),
      0
    );
    const futuresAvailableTotal = accounts.reduce(
      (total, account) => total + Number(account.futuresAvailable),
      0
    );
    const futuresCompoundedTotal = accounts.reduce(
      (total, account) => total + Number(account.futuresCompoundDeposits),
      0
    );
    const futuresDepositsTotal = accounts.reduce(
      (total, account) => total + Number(account.futuresDeposits),
      0
    );
    const futuresPayoutsTotal = accounts.reduce(
      (total, account) => total + Number(account.futuresPayouts),
      0
    );
    const nftWalletTotal = accounts.reduce(
      (total, account) => total + Number(account.nftWalletBalance),
      0
    );
    const nftStakedTotal = accounts.reduce(
      (total, account) => total + Number(account.nftStakingBalance),
      0
    );
    const nftRewardsTotal = accounts.reduce(
      (total, account) => total + Number(account.nftRewards),
      0
    );
    const nftTotalRewardsTotal = accounts.reduce(
      (total, account) => total + Number(account.nftTotalRewards),
      0
    );
    const valueTotal = accounts.reduce(
      (total, account) =>
        total +
        Number(
          calculateTotalValue(
            elephantPrice,
            account.elephantBalance,
            account.futuresCurrentBalance,
            Number(account.nftStakingBalance) +
              Number(account.nftWalletBalance),
            bnbPrice * nftPrice,
            account.trumpetValue,
            trumpetPrice,
            trunkPrice,
            account.trunkBalance
          )
        ),
      0
    );
    const nftsToBeMintedTotal = accounts.reduce(
      (total, account) => total + Number(account.nftsToBeMinted),
      0
    );
    const nftsMintedTotal = accounts.reduce(
      (total, account) => total + Number(account.nftsMinted),
      0
    );
    setTotals({
      //...totals,
      balanceTotal,
      bnbTotal,
      busdTotal,
      usdcTotal,
      trunkTotal,
      pendingAirdropsTotal,
      totalAirdropsTotal,
      trumpetValueTotal,
      trumpetTotal,
      stampedeTotal,
      stampedeAvailableTotal,
      stampedeRewardsTotal,
      redeemPendingTotal,
      futuresTotal,
      futuresAvailableTotal,
      futuresCompoundedTotal,
      futuresDepositsTotal,
      futuresPayoutsTotal,
      nftWalletTotal,
      nftStakedTotal,
      nftRewardsTotal,
      nftTotalRewardsTotal,
      valueTotal,
      nftsToBeMintedTotal,
      nftsMintedTotal
    });

    //getUpdatedElephantPrice();
    //return () => setTotals({});
  }, [accounts]);

  const displayValue = (amount, price = elephantPrice) =>
    isBusd
      ? "$" + Number(amount * price).toLocaleString()
      : Number(amount) >= 1e12
      ? Number(amount / 1e12).toLocaleString() + "T"
      : Number(amount) >= 1e9
      ? Number(amount / 1e9).toLocaleString() + "B"
      : Number(amount) >= 1e6
      ? Number(amount / 1e6).toLocaleString() + "M"
      : Number(amount).toLocaleString();

  const handleResponse = (response) => {
    setOpenDialog(false);
    removeWallet(response);
  };

  const openConfirmationDialog = (account) => {
    setOpenDialog(true);
    setSelectedRow(account);
  };

  const removeWallet = (isConfirmed) => {
    setOpenDialog(false);
    if (!isConfirmed) {
      return false;
    }
    removeAcct(selectedRow);
  };

  const formatAddress = (address) =>
    `${address.substring(0, 5)}...${address.slice(-5)}`;

  const formatCurrency = (amount) => {
    const _val = Number(amount).toLocaleString();
    return isBusd ? "$" + _val : _val;
  };

  const toggleEdit = (index) => {
    if (tableData[index].isEdit) {
      tableData[index].label = label;
      tableData[index].isEdit = false;
      setLabel("");
    } else {
      tableData[index].isEdit = true;
      setLabel(tableData[index].label);
    }
    localStorage.setItem("elephantAccountsData", JSON.stringify(tableData));
    localStorage.setItem(
      "elephantWallets",
      JSON.stringify(
        tableData.map((t) => ({ address: t.address, label: t.label }))
      )
    );
    setTableData([...tableData]);
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(tableData);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    localStorage.setItem("elephantAccountsData", JSON.stringify(tempData));
    localStorage.setItem(
      "elephantWallets",
      JSON.stringify(
        tempData.map((t) => ({ address: t.address, label: t.label }))
      )
    );
    console.log(localStorage.getItem("elephantAccountsData"))
    setTableData(tempData);
  };

  const APRRange = ({ startValue, endValue }) => (
    <span style={{ whiteSpace: "nowrap" }}>
      {startValue}% / <strong>{endValue}%</strong>
      <div>({Number(endValue * 365).toFixed(2)}%)</div>
    </span>
  );

  const calculateAPRRange = (depositAPR, dailyYield, limiterRate, compounds, deposits) => {
    const limiterPct = (100 - limiterRate) / 100;
    const dailyAPR = Number(depositAPR / 365);
    
    const startRange = dailyAPR  * limiterPct;
    let endRange = dailyAPR + dailyYield;
    
    //const maxRate = calculateRateLimiterRate(compounds, deposits)
    //endRange = endRange > 0.5 ? 0.5 : endRange;
     endRange = Math.min(endRange, 0.5 * limiterPct)
    //if( Number(endRange) > maxRate ) endRange = maxRate;    
    return <APRRange startValue={Number(startRange ).toFixed(3)} endValue={Number(endRange).toFixed(3)} />;
  };

  const calculateDecay = (depositApr, limiterRate) => {
    const personalRate = Number(depositApr / 365);
    const totalRate = personalRate + dailyYield;
    const limiterPct = (100 - limiterRate) / 100;
    const diff = totalRate - (0.5 * limiterPct);
    const daysToPctLoss = diff / 0.0111;
    if (daysToPctLoss > 0) {
      return (
        <span className={daysToPctLoss <= 2 ? "warning" : ""}>
          {daysToPctLoss.toFixed(3)}
        </span>
      );
    }
    return <span></span>;
  };

  //tableData.length && console.log(calculateStrategy(elephantPrice, tableData[0].elephantBalance, tableData[0].futuresCurrentBalance, tableData[0].nftStakingBalance, bnbPrice * 2))
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "2em", maxHeight: "100vh" }}
      >
        <Controls
          handleSwitch={() => setIsBusd(!isBusd)}
          backupData={backupData}
          configs={{
            includeNfts,
            includeTrunk,
            includeTrumpet,
            includeStampede,
            includeRedeem,
            includeFutures,
            includeUSDC,
            includeBUSD,
          }}
          toggleNfts={() => setIncludeNfts(!includeNfts)}
          toggleTrunk={() => setIncludeTrunk(!includeTrunk)}
          toggleTrumpet={() => setIncludeTrumpet(!includeTrumpet)}
          toggleStampede={() => setIncludeStampede(!includeStampede)}
          toggleRedeem={() => setIncludeRedeem(!includeRedeem)}
          toggleFutures={() => setIncludeFutures(!includeFutures)}
          toggleUSDC={() => {
            setIncludeUSDC(!includeUSDC);
          }}
          toggleBUSD={() => {
            setIncludeBUSD(!includeBUSD);
          }}
        />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Table
            sx={{
              minWidth: 650,
              backgroundColor: "AliceBlue",
            }}
            aria-label="simple table"
          >
            <TableHeader
              includeNfts={includeNfts}
              includeTrunk={includeTrunk}
              includeTrumpet={includeTrumpet}
              includeStampede={includeStampede}
              includeRedeem={includeRedeem}
              includeFutures={includeFutures}
              includeUSDC={includeUSDC}
              includeBUSD={includeBUSD}
              isBusd={isBusd}
            ></TableHeader>
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <TableBody ref={provider.innerRef} {...provider.droppableProps}>
                  <TotalsHeader
                    accounts={tableData}
                    totals={totals}
                    displayValue={displayValue}
                    formatCurrency={formatCurrency}
                    includeNfts={includeNfts}
                    includeTrunk={includeTrunk}
                    includeTrumpet={includeTrumpet}
                    includeStampede={includeStampede}
                    includeRedeem={includeRedeem}
                    includeFutures={includeFutures}
                    includeUSDC={includeUSDC}
                    includeBUSD={includeBUSD}
                    bnbPrice={bnbPrice}
                    trunkPrice={trunkPrice}
                    trumpetPrice={trumpetPrice}
                    elephantPrice={elephantPrice}
                    nftPrice={nftPrice}
                    baseRate={dailyYield}
                  />
                  {tableData.map((row, index) => (
                    <Draggable
                      key={row.address}
                      draggableId={row.address}
                      index={index}
                    >
                      {(provider) => (
                        <TableRow
                          key={row.address}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          {...provider.draggableProps}
                          ref={provider.innerRef}
                        >
                          <TableCell
                            component="td"
                            scope="row"
                            {...provider.dragHandleProps}
                          >
                            <MdOutlineDragIndicator />
                          </TableCell>
                          <TableCell align="right">
                            <DeleteOutlineOutlinedIcon
                              className="remove-row"
                              onClick={() =>
                                openConfirmationDialog(row.address)
                              }
                              sx={{ fontSize: "14px" }}
                            />
                            {` - ${index + 1}`}
                          </TableCell>
                          <TableCell
                            style={{ cursor: "copy" }}
                            onClick={(e) =>
                              navigator.clipboard.writeText(row.address)
                            }
                          >
                            {formatAddress(row.address)}
                          </TableCell>
                          <TableCell
                            className="labelCell"
                            onDoubleClick={() => toggleEdit(index)}
                          >
                            {row.isEdit ? (
                              <input
                                className={row.isEdit ? "show" : "hide"}
                                type="text"
                                size={8}
                                autoFocus
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                onBlur={() => toggleEdit(index)}
                                onKeyDown={(e) =>
                                  e.key === "Enter" && toggleEdit(index)
                                }
                              />
                            ) : (
                              row.label
                            )}
                          </TableCell>

                          <TableCell align="right">
                            {displayValue(row.bnbBalance, bnbPrice)}
                          </TableCell>
                          {includeUSDC && (
                            <TableCell align="right">
                              {formatCurrency(row.usdcBalance)}
                            </TableCell>
                          )}
                          {includeBUSD && (
                            <TableCell align="right">
                              {formatCurrency(row.busdBalance)}
                            </TableCell>
                          )}

                          <TableCell align="right">
                            {displayValue(row.elephantBalance)}
                          </TableCell>

                          {includeTrunk && (
                            <>
                              <TableCell align="right" className="tooltip">
                                {displayValue(row.trunkBalance, trunkPrice)}
                              </TableCell>
                            </>
                          )}

                          {includeTrumpet && (
                            <>
                              <TableCell align="right">
                                {displayValue(
                                  row.trumpetBalance,
                                  trunkPrice * trumpetPrice
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {displayValue(row.trumpetValue, trunkPrice)}
                                <br />
                                {row.trumpetValue > 0 &&
                                  `(${displayValue(
                                    row.trumpetValue * 0.95,
                                    trunkPrice
                                  )})`}
                              </TableCell>
                            </>
                          )}

                          {includeStampede && (
                            <>
                              <TableCell align="right">
                                {displayValue(row.stampedeBalance, trunkPrice)}
                              </TableCell>
                              <TableCell align="right">
                                {displayValue(
                                  row.stampedeAvailable,
                                  trunkPrice
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {displayValue(row.stampedeRewards, trunkPrice)}
                              </TableCell>
                              <TableCell
                                align="right"
                                className={`${
                                  row.pendingAirdrops >= 1000 ? "highlight" : ""
                                }`}
                              >
                                {displayValue(row.pendingAirdrops, trunkPrice)}
                              </TableCell>
                              <TableCell align="right" className="tooltip">
                                {displayValue(row.totalAirdrops, trunkPrice)}
                              </TableCell>
                            </>
                          )}

                          {includeRedeem && (
                            <>
                              <TableCell align="right">
                                {formatCurrency(row.redeemPending)}
                              </TableCell>
                              <TableCell align="right">
                                {row.redeemPending > 0 &&
                                  row.redeemPos + "/" + row.redeemLength}
                              </TableCell>
                            </>
                          )}

                          {includeFutures && (
                            <>
                              <TableCell align="right">
                                {formatCurrency(row.futuresCurrentBalance)}
                              </TableCell>
                              <TableCell align="right">
                                {formatCurrency(row.futuresAvailable)}
                                {row.futuresAvailable > 0 && <div>({formatCurrency(row.futuresAvailableUncapped)})</div>}
                              </TableCell>
                              <TableCell align="right">
                                {formatCurrency(row.futuresCompoundDeposits)}
                              </TableCell>
                              <TableCell align="right">
                                {formatCurrency(row.futuresDeposits)}
                              </TableCell>
                              <TableCell align="right">
                                {formatCurrency(row.futuresPayouts)}
                              </TableCell>
                              <TableCell align="right">
                                {!!row.futuresLastTx && <PopupHelp
                                  message={`${new Date(
                                    row.futuresLastTx
                                  ).toLocaleString()}`}
                                  header={`${row.futuresLastActionLong}`}
                                  trigger={<span>
                                    {" "}
                                    {row.futuresCurrentBalance > 0 &&
                                      Number(row.futuresElapsed).toFixed(2) +
                                        "(" +
                                        row.futuresLastAction +
                                        ")"}
                                  </span>}
                                />}
                              </TableCell>
                              {false && <><TableCell align="right">
                                {row.futuresCurrentBalance > 0 &&
                                  calculateAPRRange(row.depositAPR, dailyYield, row.limiterRate, row.futuresCompoundDeposits, row.futuresDeposits)}
                              </TableCell>
                              <TableCell align="right">
                                {row.futuresCurrentBalance > 0 &&
                                  calculateDecay(row.depositAPR, row.limiterRate)}
                                  </TableCell></>}
                              <TableCell align="right">
                                {formatCurrency(row.futuresPayouts - row.futuresCompoundDeposits)}
                              </TableCell>
                               <TableCell align="right">
                                 <span className={row.futuresRemainingCooldown > 0 ? "warning" : ""}>{Number((row.futuresRemainingCooldown ?? 0) / 60 / 60 / 24).toFixed(2)}</span>
                              </TableCell>
                              <TableCell align="right">
                                {!!row.futuresUser && formatPct((row.futuresPayouts - row.futuresCompoundDeposits) / row.futuresDeposits) + "%"}
                              </TableCell>
                              
                              <TableCell align="right">
                                {row.nftsToBeMinted}
                              </TableCell>
                              <TableCell align="right">
                                {row.nftsMinted}
                              </TableCell>
                            </>
                          )}

                          {includeNfts && (
                            <>
                              <TableCell align="right">
                                {row.nftWalletBalance > 0 ? (
                                  <Link to={`nfts/${row.address}/${Number(row.nftWalletBalance) + Number(row.nftStakingBalance)}`}>
                                    {row.nftWalletBalance}
                                  </Link>
                                ) : (
                                  row.nftWalletBalance
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {row.nftStakingBalance > 0 ? (
                                  <Link to={`nfts/${row.address}/${Number(row.nftWalletBalance) + Number(row.nftStakingBalance)}`}>
                                    {row.nftStakingBalance}
                                  </Link>
                                ) : (
                                  row.nftStakingBalance
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {displayValue(row.nftRewards  / 10e8, trunkPrice)}
                              </TableCell>
                              <TableCell align="right">
                                {displayValue(row.nftTotalRewards / 10e8, trunkPrice)}
                              </TableCell>
                            </>
                          )}
                          {false && <><TableCell>
                            {calculateStrategy(
                              elephantPrice,
                              row.elephantBalance,
                              row.futuresCurrentBalance,
                              Number(row.nftStakingBalance) +
                                Number(row.nftWalletBalance),
                              bnbPrice * nftPrice,
                              row.trumpetValue,
                              trumpetPrice,
                              trunkPrice
                            )}
                          </TableCell>
                          <TableCell>
                            $
                            {calculateTotalValue(
                              elephantPrice,
                              row.elephantBalance,
                              row.futuresCurrentBalance,
                              Number(row.nftStakingBalance) +
                                Number(row.nftWalletBalance),
                              bnbPrice * nftPrice,
                              row.trumpetValue,
                              trumpetPrice,
                              trunkPrice,
                              Number(row.trunkBalance)
                            ).toLocaleString()}
                              </TableCell></>}
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </TableContainer>
      {openDialog && <ConfirmationDialog handleResponse={handleResponse} />}
    </>
  );
}

const TableHeader = ({
  includeNfts,
  isBusd,
  includeTrunk,
  includeTrumpet,
  includeStampede,
  includeRedeem,
  includeFutures,
  includeUSDC,
  includeBUSD,
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>Account</TableCell>
        <TableCell>Label</TableCell>
        {true && (
          <>
            <TableCell align="right">BNB</TableCell>
            {includeUSDC && <TableCell align="right">USDC</TableCell>}
            {includeBUSD && <TableCell align="right">BUSD</TableCell>}
          </>
        )}
        <TableCell align="right">Elephant </TableCell>
        {includeTrunk && (
          <>
            <TableCell align="right">Trunk</TableCell>
          </>
        )}

        {includeTrumpet && (
          <>
            <TableCell align="right">Trumpet </TableCell>
            <TableCell align="right">
              Trumpet
              <br />
              Value:Trunk
              <br />
              (After Tax)
            </TableCell>
          </>
        )}

        {includeStampede && (
          <>
            <TableCell align="right">Stampede Balance</TableCell>
            <TableCell align="right">Stampede Available</TableCell>
            <TableCell align="right">Stampede Rewards</TableCell>
            <TableCell align="right">Pending Airdrops</TableCell>
            <TableCell align="right">Total Airdrops</TableCell>
          </>
        )}

        {includeRedeem && (
          <>
            <TableCell align="right">Redemption Queue Pending</TableCell>
            <TableCell align="right">Queue Position</TableCell>
          </>
        )}

        {includeFutures && (
          <>
            <TableCell align="right">Futures Balance</TableCell>
            <TableCell align="right">Futures Available
            <div>(optimal)</div>
            </TableCell>
            <TableCell align="right">Futures Compounded</TableCell>
            <TableCell align="right">Futures Deposits</TableCell>
            <TableCell align="right">Futures Claimed</TableCell>
            <TableCell align="right">
              Futures Days Since Last Tx (Action)
            </TableCell>
            {false && <><TableCell align="right">Futures Bonus/Total Yield
            <div>(APR)</div>
            </TableCell>
            <TableCell align="right">
              <PopupHelp
                message={`The approximate number of days until the daily max yield begins to decay. 
          The total rate is the group rate plus your personal rate, 
          which starts at .5 when you deposit, so your total raw rate will be 
          higher than .5, but it caps at .5%. Personal rate decays at .0111 per day.`}
                trigger={<span>Days Left at Max Yield</span>}
              />
                </TableCell></>}
            <TableCell align="right">Futures Withdrawn</TableCell>
            <TableCell align="right">Futures Cooldown 
              <div>(Days)</div>
            </TableCell>
            <TableCell align="right">Futures ROI</TableCell>

            <TableCell align="right">
              <PopupHelp
                message="Migration of Futures TV to NFTs at a price of $350 per NTF."
                trigger={<span>NFTs to Mint</span>}
              ></PopupHelp>
            </TableCell>
            <TableCell>NFTs Minted</TableCell>
          </>
        )}

        {includeNfts && (
          <>
            <TableCell align="right">Wallet NFTs</TableCell>
            <TableCell align="right">Staked NFTs</TableCell>
            <TableCell align="right">NFT Rewards Available (Trunk)</TableCell>
            <TableCell align="right">Total NFT Rewards</TableCell>
          </>
        )}
        {false && <><TableCell>
          <PopupHelp
            message="Allocation of investments as a percentage across Elephant / Futures / NFTs / Trunk"
            trigger={<span>Allocation Strategy (E/F/N/T)%</span>}
          />
            </TableCell>
        <TableCell>Total Value (El/F/N/T)</TableCell></>}
      </TableRow>
    </TableHead>
  );
};
const TotalsHeader = ({
  accounts,
  totals,
  displayValue,
  formatCurrency,
  includeNfts,
  includeTrunk,
  includeTrumpet,
  includeStampede,
  includeRedeem,
  includeFutures,
  bnbPrice,
  trunkPrice,
  trumpetPrice,
  elephantPrice,
  nftPrice = 2,
  includeUSDC,
  includeBUSD,
  baseRate
}) => {
  return (
    <>
      <TableRow sx={{ backgroundColor: "lightgrey" }} className="totals-row">
        <TableCell></TableCell>
        <TableCell>Totals</TableCell>
        <TableCell>{accounts.length}</TableCell>

        <TableCell></TableCell>
        {true && (
          <>
            <TableCell align="right">
              {displayValue(totals.bnbTotal, bnbPrice)}
            </TableCell>
            {includeUSDC && (
              <TableCell align="right">
                {formatCurrency(totals.usdcTotal)}
              </TableCell>
            )}
            {includeBUSD && (
              <TableCell align="right">
                {formatCurrency(totals.busdTotal)}
              </TableCell>
            )}
          </>
        )}
        <TableCell align="right">{displayValue(totals.balanceTotal)}</TableCell>

        {includeTrunk && (
          <>
            <TableCell align="right">
              {displayValue(totals.trunkTotal, trunkPrice)}
            </TableCell>
          </>
        )}

        {includeTrumpet && (
          <>
            <TableCell align="right">
              {displayValue(totals.trumpetTotal, trunkPrice * trumpetPrice)}
            </TableCell>
            <TableCell align="right">
              {displayValue(totals.trumpetValueTotal, trunkPrice)}
              <br />({displayValue(totals.trumpetValueTotal * 0.95, trunkPrice)}
              )
            </TableCell>
          </>
        )}

        {includeStampede && (
          <>
            <TableCell align="right">
              {displayValue(totals.stampedeTotal, trunkPrice)}
            </TableCell>
            <TableCell align="right">
              {displayValue(totals.stampedeAvailableTotal, trunkPrice)}
            </TableCell>
            <TableCell align="right">
              {displayValue(totals.stampedeRewardsTotal, trunkPrice)}
            </TableCell>
            <TableCell align="right">
              {displayValue(totals.pendingAirdropsTotal, trunkPrice)}
            </TableCell>
            <TableCell align="right">
              {displayValue(totals.totalAirdropsTotal, trunkPrice)}
            </TableCell>
          </>
        )}

        {includeRedeem && (
          <>
            <TableCell align="right">
              {formatCurrency(totals.redeemPendingTotal)}
            </TableCell>
            <TableCell align="right"></TableCell>
          </>
        )}

        {includeFutures && (
          <>
            <TableCell align="right">
              {formatCurrency(totals.futuresTotal)}
            </TableCell>
            <TableCell align="right">
              {formatCurrency(totals.futuresAvailableTotal)}
            </TableCell>
            <TableCell align="right">
              {formatCurrency(totals.futuresCompoundedTotal)}
            </TableCell>
            <TableCell align="right">
              {formatCurrency(totals.futuresDepositsTotal)}
            </TableCell>
            <TableCell align="right">
              {formatCurrency(totals.futuresPayoutsTotal)}
            </TableCell>
            <TableCell></TableCell>
            {false && <><TableCell align="right"><PopupHelp
                message="The number of days that your personal rate plus the base rate 
              will stay at or above .5% per day.  Personal rate decays at .011 per day, 
              but the base rate is variable."
                trigger={<span>Decay Rate</span>}
              ></PopupHelp>
              <div><span className={baseRate < .1554 ? "warning" : ""}>{Number(baseRate / .0111).toLocaleString()} days</span></div>
            </TableCell>
            
                <TableCell></TableCell></>}
            <TableCell align="right">
              {formatCurrency(totals.futuresPayoutsTotal - totals.futuresCompoundedTotal)}
            </TableCell>
            <TableCell></TableCell>
            <TableCell>{totals.futuresDepositsTotal > 0 && formatPct((totals.futuresPayoutsTotal - totals.futuresCompoundedTotal) / totals.futuresDepositsTotal) + "%"}</TableCell>
            
            <TableCell align="right">{totals.nftsToBeMintedTotal}</TableCell>
            <TableCell align="right">{totals.nftsMintedTotal}</TableCell>
          </>
        )}

        {includeNfts && (
          <>
            <TableCell align="right">{totals.nftWalletTotal}</TableCell>
            <TableCell align="right">{totals.nftStakedTotal}</TableCell>
            <TableCell align="right">
              {displayValue(totals.nftRewardsTotal / 10e8, trunkPrice)}
            </TableCell>
            <TableCell align="right">
              {displayValue(totals.nftTotalRewardsTotal / 10e8, trunkPrice)}
            </TableCell>
          </>
        )}
        {false && <><TableCell>
          {calculateStrategy(
            elephantPrice,
            totals.balanceTotal,
            totals.futuresTotal,
            Number(totals.nftStakedTotal) + Number(totals.nftWalletTotal),
            bnbPrice * nftPrice,
            totals.trumpetValueTotal,
            trumpetPrice,
            trunkPrice
          )}
        </TableCell>
            <TableCell>${Number(totals.valueTotal).toLocaleString()}</TableCell></>}
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}>
          * Double click label cell to edit. Enter, tab, or click away to save.
        </TableCell>
      </TableRow>
    </>
  );
};
