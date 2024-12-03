import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import FavoriteButton from '@src/components/ui/FavoriteButton/FavoriteButton';
import Loader from '@src/components/ui/Loader/Loader';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import {
  addMiscellaneouToSaved,
  removeMiscellaneouFromSaved,
} from '@src/store/slices/userSlice';
import { IMiscellaneousResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedMiscellaneou } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Miscellaneous.module.scss';

const Miscellaneous = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedMiscellaneous = useAppSelector(
    (state) => state.userReducer.userInfo?.miscellaneous,
  );

  const [miscellaneous, setMiscellaneous] = useState<
    IMiscellaneousResponse | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getMiscellaneous();
      setMiscellaneous(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedMiscellaneou(
      id,
      isInArray(id, savedMiscellaneous),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addMiscellaneouToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeMiscellaneouFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Miscellaneous</h2>

        {isLoading && <Loader />}

        <TableContainer component={Paper} className={styles.table_wrapper}>
          <Table sx={{ minWidth: 650 }}>
            <TableBody>
              {miscellaneous?.data.map((miscellaneou) => (
                <TableRow
                  key={miscellaneou.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {miscellaneou.name}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <div className={styles.btn_wrapper}>
                        <FavoriteButton
                          isInFavorites={isInArray(
                            miscellaneou.id,
                            savedMiscellaneous,
                          )}
                          onClick={() => handleToggleSaved(miscellaneou.id)}
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

export default Miscellaneous;
