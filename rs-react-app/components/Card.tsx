import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { addCheck, selectAllChecks } from '../features/check';

interface CardProps {
  element: unknown;
  id: string;
}

export const Card: FC<CardProps> = ({ element, id }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  let title = '';
  if (element && typeof element === 'object') {
    title =
      'name' in element
        ? (element.name as string)
        : 'title' in element
          ? (element.title as string)
          : 'name';
  }

  const handleCardClick = async (e: React.MouseEvent) => {
    if (!location.pathname.startsWith('/details/')) {
      e.stopPropagation();
    }
    const target = e.target as HTMLElement;
    const row = target.closest('.row');
    if (row) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('id');
      router.push(`/details/${row.id}?${params.toString()}`);
    }
  };

  const handleCheckClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addCheck({ id, checked: e.target.checked }));
  };

  const checkedItems = useSelector(selectAllChecks);
  const isChecked = checkedItems.includes(id);

  return (
    <div
      className={'row ' + (theme === 'light' ? 'row--light' : 'row--dark')}
      id={id}
    >
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        onChange={handleCheckClick}
        className={theme === 'light' ? 'lightInput' : 'darkInput'}
        checked={isChecked}
      />
      <div className="row-name" onClick={handleCardClick}>
        {title}
      </div>
    </div>
  );
};
