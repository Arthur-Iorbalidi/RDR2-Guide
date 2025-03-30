import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import routes from '@src/constants/routes';
import useAppSelector from '@src/hooks/useAppSelector';
import serverAPI from '@src/services/serverAPI';
import {
  removeMiscellaneouFromSaved,
  setSavedMiscellaneous,
} from '@src/store/slices/userSlice';
import { ISavedMiscellaneousResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedMiscellaneou } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FavoriteButton from '../ui/FavoriteButton/FavoriteButton';
import Loader from '../ui/Loader/Loader';
import Message from '../ui/Message/Message';
import styles from './SavedMiscellaneous.module.scss';

const SavedMiscellaneous = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedMiscellaneous = useAppSelector(
    (state) => state.userReducer.userInfo?.miscellaneous,
  );

  const [miscellaneous, setMiscellaneous] = useState<
    ISavedMiscellaneousResponse['data'] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedMiscellaneous) {
        const savedMiscellaneous = await serverAPI.getSavedMiscellaneous();
        dispatch(setSavedMiscellaneous(savedMiscellaneous));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedMiscellaneous();
      setMiscellaneous(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedMiscellaneou(
      id,
      isInArray(id, savedMiscellaneous, 'miscellaneousId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeMiscellaneouFromSaved(id));
    setMiscellaneous((prevMiscellaneous) =>
      prevMiscellaneous!.filter(
        (miscellaneou) => miscellaneou.miscellaneous.id !== id,
      ),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      {isLoading && <Loader />}
      {miscellaneous && miscellaneous.length > 0 ? (
        <TableContainer component={Paper} className={styles.table_wrapper}>
          <Table sx={{ minWidth: 650 }}>
            <TableBody>
              {miscellaneous?.map((miscellaneou) => (
                <TableRow
                  key={miscellaneou.miscellaneous.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {miscellaneou.miscellaneous.name}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <div className={styles.btn_wrapper}>
                        <FavoriteButton
                          isInFavorites={isInArray(
                            miscellaneou.miscellaneous.id,
                            savedMiscellaneous,
                            'miscellaneousId',
                          )}
                          onClick={() =>
                            handleToggleSaved(miscellaneou.miscellaneous.id)
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

export default SavedMiscellaneous;
