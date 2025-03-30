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
  removeFactionFromSaved,
  setSavedFactions,
} from '@src/store/slices/userSlice';
import { ISavedFactionsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedFaction } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FavoriteButton from '../ui/FavoriteButton/FavoriteButton';
import Loader from '../ui/Loader/Loader';
import Message from '../ui/Message/Message';
import styles from './SavedFactions.module.scss';

const SavedFactions = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedFactions = useAppSelector(
    (state) => state.userReducer.userInfo?.factions,
  );

  const [factions, setFactions] = useState<
    ISavedFactionsResponse['data'] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedFactions) {
        const savedFactions = await serverAPI.getSavedFactions();
        dispatch(setSavedFactions(savedFactions));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedFactions();
      setFactions(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedFaction(
      id,
      isInArray(id, savedFactions, 'factionId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeFactionFromSaved(id));
    setFactions((prevFactions) =>
      prevFactions!.filter((faction) => faction.faction.id !== id),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      {isLoading && <Loader />}
      {factions && factions.length > 0 ? (
        <TableContainer component={Paper} className={styles.table_wrapper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Leader</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {factions?.map((faction) => (
                <TableRow
                  key={faction.faction.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {faction.faction.name}
                  </TableCell>
                  <TableCell align="right">{faction.faction.leader}</TableCell>
                  <TableCell align="right">{faction.faction.status}</TableCell>
                  <TableCell align="right">
                    {
                      <div className={styles.btn_wrapper}>
                        <FavoriteButton
                          isInFavorites={isInArray(
                            faction.faction.id,
                            savedFactions,
                            'factionId',
                          )}
                          onClick={() => handleToggleSaved(faction.faction.id)}
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

export default SavedFactions;
