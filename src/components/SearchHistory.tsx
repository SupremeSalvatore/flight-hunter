import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import type {
  SearchHistory as SearchHistoryType,
  SearchFilters
} from '../types/flight.types';

interface SearchHistoryProps {
  history: SearchHistoryType[];
  onSelectHistory: (filters: SearchFilters) => void;
  onClearHistory: () => void;
}

export function SearchHistory({
  history,
  onSelectHistory,
  onClearHistory
}: SearchHistoryProps) {
  const { t } = useTranslation();

  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t('history.title')}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-destructive hover:text-destructive"
          >
            {t('history.clearAll')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {history.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              size="sm"
              onClick={() => onSelectHistory(item.filters)}
              className="text-sm"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
