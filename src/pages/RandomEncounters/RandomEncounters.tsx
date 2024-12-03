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
  addRandomEncounterToSaved,
  removeRandomEncounterFromSaved,
} from '@src/store/slices/userSlice';
import { IRandomEncountersResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedRandomEncounter } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styles from './RandomEncounters.module.scss';

const RandomEncounters = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedRandomEncounters = useAppSelector(
    (state) => state.userReducer.userInfo?.randomEncounters,
  );

  const [randomEncounters, setRandomEncounters] = useState<
    IRandomEncountersResponse | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getRandomEncounters();
      setRandomEncounters(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedRandomEncounter(
      id,
      isInArray(id, savedRandomEncounters),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addRandomEncounterToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeRandomEncounterFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Random encounters</h2>

        {isLoading && <Loader />}

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
              {randomEncounters?.data.map((randomEncounter) => (
                <TableRow
                  key={randomEncounter.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {randomEncounter.name}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={routes.factions}>
                      {randomEncounter.faction?.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {
                      <div className={styles.btn_wrapper}>
                        <FavoriteButton
                          isInFavorites={isInArray(
                            randomEncounter.id,
                            savedRandomEncounters,
                          )}
                          onClick={() => handleToggleSaved(randomEncounter.id)}
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

export default RandomEncounters;
