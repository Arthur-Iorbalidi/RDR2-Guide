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
  addChallengeToSaved,
  removeChallengeFromSaved,
} from '@src/store/slices/userSlice';
import { IChallengesResponse } from '@src/types/serverAPITypes';
import isInArray from '@src/utils/isInArray';
import { toggleSavedChallenge } from '@src/utils/toggleSaved';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Challenges.module.scss';

const Challenges = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const savedChallenges = useAppSelector(
    (state) => state.userReducer.userInfo?.challenges,
  );

  const [challenges, setChallenges] = useState<IChallengesResponse | undefined>(
    undefined,
  );

  const params = useAppSelector((state) => state.searchReducer.fishes);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await serverAPI.getChallenges(params);
      setChallenges(data);
      setIsLoading(false);
    })();
  }, [params]);

  const handleToggleSaved = (id: number) => {
    toggleSavedChallenge(
      id,
      isInArray(id, savedChallenges),
      succesAdd,
      succesRemove,
      unathorizedCallback,
    );
  };

  const succesAdd = (id: number) => {
    dispatch(addChallengeToSaved(id));
  };

  const succesRemove = (id: number) => {
    dispatch(removeChallengeFromSaved(id));
  };

  const unathorizedCallback = () => {
    navigate(routes.login);
  };

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Challenges</h2>

        {isLoading && <Loader />}

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
              {challenges?.data.map((challenge) => (
                <TableRow
                  key={challenge.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {challenge.name}
                  </TableCell>
                  <TableCell align="right">{challenge.rank}</TableCell>
                  <TableCell align="right">{challenge.reward}</TableCell>
                  <TableCell align="right">{challenge.description}</TableCell>
                  <TableCell align="right">
                    {
                      <div className={styles.btn_wrapper}>
                        <FavoriteButton
                          isInFavorites={isInArray(
                            challenge.id,
                            savedChallenges,
                          )}
                          onClick={() => handleToggleSaved(challenge.id)}
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

export default Challenges;
