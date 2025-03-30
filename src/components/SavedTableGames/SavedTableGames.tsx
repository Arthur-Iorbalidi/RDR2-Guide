import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import {
  removeTableGameFromSaved,
  setSavedTableGames,
} from '@src/store/slices/userSlice';
import { ISavedTableGamesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedTableGame } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FavoriteButton from '../ui/FavoriteButton/FavoriteButton';
import Loader from '../ui/Loader/Loader';
import Message from '../ui/Message/Message';
import styles from './SavedTableGames.module.scss';

const SavedTableGames = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedTableGames = useAppSelector(
    (state) => state.userReducer.userInfo?.tableGames,
  );

  const [tableGames, setTableGames] = useState<
    ISavedTableGamesResponse['data'] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedTableGames) {
        const savedTableGames = await serverAPI.getSavedTableGames();
        dispatch(setSavedTableGames(savedTableGames));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedTableGames();
      setTableGames(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedTableGame(
      id,
      isInArray(id, savedTableGames, 'tablegameId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeTableGameFromSaved(id));
    setTableGames((prevTableGames) =>
      prevTableGames!.filter((tableGame) => tableGame.tablegame.id !== id),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      {isLoading && <Loader />}
      {tableGames && tableGames.length > 0 ? (
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
              {tableGames?.map((tableGame) => (
                <TableRow
                  key={tableGame.tablegame.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {tableGame.tablegame.name}
                  </TableCell>
                  <TableCell align="left">
                    {tableGame.tablegame.description}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <div className={styles.btn_wrapper}>
                        <FavoriteButton
                          isInFavorites={isInArray(
                            tableGame.tablegame.id,
                            savedTableGames,
                            'tablegameId',
                          )}
                          onClick={() =>
                            handleToggleSaved(tableGame.tablegame.id)
                          }
                        />
                      </div>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Message message="There is nothing here" />
      )}
    </>
  );
};

export default SavedTableGames;
