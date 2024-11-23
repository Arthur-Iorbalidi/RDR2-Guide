import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
