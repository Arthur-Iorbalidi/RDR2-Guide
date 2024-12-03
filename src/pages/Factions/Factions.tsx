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
  addFactionToSaved,
  removeFactionFromSaved,
} from '@src/store/slices/userSlice';
import { IFactionsResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedFaction } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Factions.module.scss';

const Factions = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedFactions = useAppSelector(
    (state) => state.userReducer.userInfo?.factions,
  );

  const [factions, setFactions] = useState<IFactionsResponse | undefined>(
    undefined,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getFactions();
      setFactions(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedFaction(
      id,
      isInArray(id, savedFactions),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addFactionToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeFactionFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Factions</h2>

        {isLoading && <Loader />}

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
              {factions?.data.map((faction) => (
                <TableRow
                  key={faction.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {faction.name}
                  </TableCell>
                  <TableCell align="right">{faction.leader}</TableCell>
                  <TableCell align="right">{faction.status}</TableCell>
                  <TableCell align="right">
                    {
                      <div className={styles.btn_wrapper}>
                        <FavoriteButton
                          isInFavorites={isInArray(faction.id, savedFactions)}
                          onClick={() => handleToggleSaved(faction.id)}
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

export default Factions;
