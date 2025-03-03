import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '../context/ThemeContext';
import {
  deleteChecks,
  fetchItemDetails,
  selectAllChecks,
} from '../features/check';
import { AppDispatch } from '../app/store';

export const Flayout: FC = () => {
  const checkedItems = useSelector(selectAllChecks);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();

  const unselectAll = () => {
    dispatch(deleteChecks());
  };

  const convertToCSV = (items: string[]) => {
    if (items.length === 0) return '';

    const headers = Object.keys(items[0]).join(',') + '\n';
    const rows = items
      .map((item) =>
        Object.values(item)
          .map((value) => JSON.stringify(value, null, 2))
          .join(',')
      )
      .join('\n');

    return headers + rows;
  };

  async function saveFile() {
    try {
      const fileName = `${checkedItems.length}_items.csv`;

      const itemDetails = await dispatch(
        fetchItemDetails(checkedItems)
      ).unwrap();

      const csvContent = convertToCSV(itemDetails);
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: 'CSV File',
            accept: { 'text/csv': ['.csv'] },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(csvContent);
      await writable.close();

      console.log(`File saved as ${fileName}`);
    } catch (error) {
      console.error('File saving failed:', error);
    }
  }

  const handleDownload = async () => {
    await saveFile();
  };

  return (
    <div
      className={'flayout ' + (theme === 'light' ? 'light' : 'dark')}
      data-testid="flayout"
    >
      <div>{checkedItems.length} items selected</div>
      <button onClick={unselectAll}>Unselect All</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};
