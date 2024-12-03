import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import {
  addTableGameToSaved,
  removeTableGameFromSaved,
} from '@src/store/slices/userSlice';
import { ITableGamesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedTableGame } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './TableGames.module.scss';

const TableGames = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedTableGames = useAppSelector(
    (state) => state.userReducer.userInfo?.tableGames,
  );

  const [tableGames, setTableGames] = useState<ITableGamesResponse | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getTableGames();
      setTableGames(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedTableGame(
      id,
      isInArray(id, savedTableGames),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addTableGameToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeTableGameFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Table games</h2>

        {isLoading && <Loader />}

        <TableContainer component={Paper} className={styles.table_wrapper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableGames?.data.map((tableGame) => (
                <TableRow
                  key={tableGame.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {tableGame.name}
                  </TableCell>
                  <TableCell align="left">{tableGame.description}</TableCell>
                  <TableCell align="right">
                    {
                      <div className={styles.btn_wrapper}>
                        <FavoriteButton
                          isInFavorites={isInArray(
                            tableGame.id,
                            savedTableGames,
                          )}
                          onClick={() => handleToggleSaved(tableGame.id)}
                        />
                      </div>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default TableGames;
