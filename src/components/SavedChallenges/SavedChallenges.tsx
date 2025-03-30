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
  removeChallengeFromSaved,
  setSavedChallenges,
} from '@src/store/slices/userSlice';
import { ISavedChallengesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedChallenge } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FavoriteButton from '../ui/FavoriteButton/FavoriteButton';
import Loader from '../ui/Loader/Loader';
import Message from '../ui/Message/Message';
import styles from './SavedChallenges.module.scss';

const SavedChallenges = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.userReducer.isAuthorized,
  );

  const savedChallenges = useAppSelector(
    (state) => state.userReducer.userInfo?.challenges,
  );

  const [challenges, setChallenges] = useState<
    ISavedChallengesResponse['data'] | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthorized && !savedChallenges) {
        const savedChallenges = await serverAPI.getSavedChallenges();
        dispatch(setSavedChallenges(savedChallenges));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getSavedChallenges();
      setChallenges(data);
      setIsLoading(false);
    })();
  }, []);

  const handleToggleSaved = (id: number) => {
    toggleSavedChallenge(
      id,
      isInArray(id, savedChallenges, 'challengeId'),
      undefined,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesRemove = (id: number) => {
    dispatch(removeChallengeFromSaved(id));
    setChallenges((prevChallenges) =>
      prevChallenges!.filter((challenge) => challenge.challenge.id !== id),
    );
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <>
      {isLoading && <Loader />}
      {challenges && challenges.length > 0 ? (
        <TableContainer component={Paper} className={styles.table_wrapper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Rank</TableCell>
                <TableCell align="right">Reward</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {challenges?.map((challenge) => (
                <TableRow
                  key={challenge.challenge.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {challenge.challenge.name}
                  </TableCell>
                  <TableCell align="right">
                    {challenge.challenge.rank}
                  </TableCell>
                  <TableCell align="right">
                    {challenge.challenge.reward}
                  </TableCell>
                  <TableCell align="right">
                    {challenge.challenge.description}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <div className={styles.btn_wrapper}>
                        <FavoriteButton
                          isInFavorites={isInArray(
                            challenge.challenge.id,
                            savedChallenges,
                            'challengeId',
                          )}
                          onClick={() =>
                            handleToggleSaved(challenge.challenge.id)
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

export default SavedChallenges;
