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
  removeRandomEncounterFromSaved,
  setSavedRandomEncounters,
} from '@src/store/slices/userSlice';
import { ISavedRandomEncountersResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedRandomEncounter } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import FavoriteButton from '../ui/FavoriteButton/FavoriteButton';
import Loader from '../ui/Loader/Loader';
import Message from '../ui/Message/Message';
import styles from './SavedRandomEncounters.module.scss';

const SavedRandomEncounters = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedRandomEncounters = useAppSelector(
    (state) => state.userReducer.userInfo?.randomEncounters,
  );

  const [randomEncounters, setRandomEncounters] = useState<
    ISavedRandomEncountersResponse['data'] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedRandomEncounters) {
        const savedRandomEncounters =
          await serverAPI.getSavedRandomEncounters();
        dispatch(setSavedRandomEncounters(savedRandomEncounters));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedRandomEncounters();
      setRandomEncounters(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedRandomEncounter(
      id,
      isInArray(id, savedRandomEncounters, 'randomencounterId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeRandomEncounterFromSaved(id));
    setRandomEncounters((prevRandomEncounters) =>
      prevRandomEncounters!.filter(
        (randomEncounter) => randomEncounter.randomencounter.id !== id,
      ),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      {isLoading && <Loader />}
      {randomEncounters && randomEncounters.length > 0 ? (
        <TableContainer component={Paper} className={styles.table_wrapper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Faction</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {randomEncounters?.map((randomEncounter) => (
                <TableRow
                  key={randomEncounter.randomencounter.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {randomEncounter.randomencounter.name}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={routes.factions}>
                      {randomEncounter.randomencounter.faction?.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {
                      <div className={styles.btn_wrapper}>
                        <FavoriteButton
                          isInFavorites={isInArray(
                            randomEncounter.randomencounter.id,
                            savedRandomEncounters,
                            'randomencounterId',
                          )}
                          onClick={() =>
                            handleToggleSaved(
                              randomEncounter.randomencounter.id,
                            )
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

export default SavedRandomEncounters;
