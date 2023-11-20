import { BetResult } from "@/enums";
import { getPalpitesFromBet } from "@/helper";
import { IPaper } from "@/types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useState } from "react";

interface IPaperInfoProps {
  paper: IPaper;
}
export default function PaperInfo({ paper }: IPaperInfoProps) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Paper sx={{ width: "100%" }}>
      <Box p={2}>
        <Box display={"flex"} justifyContent={"space-between"} mb={0.5}>
          <Box display={"flex"}>
            <Typography variant="body2" color="initial">
              Aposta:
            </Typography>
            <Typography variant="body2" color="primary" ml={1}>
              {paper.quantity! > 1 ? "Múltipla" : "Única"}
            </Typography>
            <Typography variant="body2" color="initial" ml={2}>
              Odd:
            </Typography>
            <Typography variant="body2" color="primary" ml={1}>
              {paper.rate}
            </Typography>
          </Box>
          <Box display={"flex"}>
            <Button variant="text" color="primary" onClick={() => setShowDetails(!showDetails)}>
              detalhes
            </Button>
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} mb={0.5}>
          <Box display={"flex"}>
            <Typography variant="body2" color="initial">
              Palpite:
            </Typography>
            <Typography variant="body2" color="primary" ml={1}>
              {getPalpitesFromBet(paper.bets)}
            </Typography>
          </Box>
          <Box display={"flex"}>
            <Typography variant="body2" color="initial">
              Valor:
            </Typography>
            <Typography variant="body2" color="primary" ml={1}>
              R$ {paper.amount}
            </Typography>
            <Typography variant="body2" color="initial" ml={1}>
              Lucro possível:
            </Typography>
            <Typography variant="body2" color="primary" ml={1}>
              R$ {paper.profit}
            </Typography>
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} mb={0.5}>
          <Box display={"flex"}>
            <Typography variant="body2" color="initial">
              Jogos:
            </Typography>
            <Typography variant="body2" color="primary" ml={1}>
              {paper.bets.length}
            </Typography>
          </Box>
          <Box display={"flex"}>
            <Typography variant="body2" color="initial">
              Data da aposta:
            </Typography>
            <Typography variant="body2" color="primary" ml={1}>
              {moment(paper.created_at).format("DD/MM/YYYY")}
            </Typography>
            <Typography variant="body2" color="initial" ml={1}>
              Hora:
            </Typography>
            <Typography variant="body2" color="primary" ml={1}>
              {moment(paper.created_at).format("hh:mm")}
            </Typography>
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"end"}>
          <Typography variant="body2" color="initial" ml={1}>
            Resultado:
          </Typography>
          <Typography
            variant="body2"
            sx={({ palette }) => ({
              color:
                paper.result === 0
                  ? palette.warning.main
                  : paper.result === 1
                  ? palette.primary.main
                  : palette.error.main,
            })}
            ml={1}
          >
            {BetResult[paper.result || 0]}
          </Typography>
        </Box>

        {paper?.bets &&
          paper.bets.map((bet, index) => (
            <div key={index}>
              {showDetails && (
                <Paper
                  elevation={3}
                  sx={(theme) => ({
                    mb: 1,
                    p: 2,
                    backgroundColor: theme.palette.background.default,
                  })}
                >
                  <Box display={"flex"} flexDirection={"row"} mb={0.5}>
                    <Typography variant="subtitle2" color="initial">
                      Odd:
                    </Typography>
                    <Typography variant="subtitle2" color="primary" ml={1}>
                      {bet.rate}
                    </Typography>
                  </Box>
                  <Box display={"flex"} flexDirection={"row"} mb={0.5}>
                    <Typography variant="subtitle2" color="initial">
                      Palpite:
                    </Typography>
                    <Typography variant="subtitle2" color="primary" ml={1}>
                      {bet.bet_choice === 1
                        ? bet.game?.home_name
                        : bet.bet_choice === -1
                        ? bet.game?.away_name
                        : "Empate"}
                    </Typography>
                  </Box>

                  <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} mb={0.5}>
                    <Box display={"flex"}>
                      <Typography variant="subtitle2" color="initial">
                        Jogo:
                      </Typography>
                      <Typography variant="subtitle2" color="primary" ml={1}>
                        {bet.game?.home_name + " vs " + bet.game?.away_name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    <Box display={"flex"}>
                      <Typography variant="subtitle2" color="initial">
                        Data do Jogo:
                      </Typography>
                      <Typography variant="subtitle2" color="primary" ml={1}>
                        {moment(bet.game?.time_close_bet).format("DD/MM/YYYY hh:mm")}
                      </Typography>
                    </Box>
                    <Box display={"flex"}>
                      <Typography variant="subtitle2" color="initial">
                        Resultado do jogo:
                      </Typography>
                      {bet.game && bet.game.done ? (
                        <>
                          {bet.bet_choice === bet.game.result ? (
                            <Typography variant="subtitle2" color="primary" ml={1}>
                              Vitória
                            </Typography>
                          ) : (
                            <Typography variant="subtitle2" color="error" ml={1}>
                              Derrota
                            </Typography>
                          )}
                        </>
                      ) : (
                        <Typography variant="subtitle2" color="warning" ml={1}>
                          Aberto
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Paper>
              )}
            </div>
          ))}
      </Box>
    </Paper>
  );
}
