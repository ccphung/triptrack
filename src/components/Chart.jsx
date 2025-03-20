import { useSelector } from 'react-redux';
import { getExpenses } from '../store';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useParams } from 'react-router-dom';

function Chart() {
  const { travelId } = useParams();
  const expenses = useSelector(getExpenses);
  const expensesByTravel = expenses.filter(
    (expense) => expense.travelId === travelId,
  );

  const expensesByCategory = expensesByTravel.reduce((acc, expense) => {
    const category = expense.category;
    const priceInEur =
      expense.selectedCurrency !== 'EUR'
        ? expense.price / expense.exchangeRate
        : expense.price;

    if (!acc[category]) {
      acc[category] = Number(priceInEur);
    } else {
      acc[category] += Number(priceInEur);
    }

    return acc;
  }, {});

  const labels = Object.keys(expensesByCategory);
  const data = Object.values(expensesByCategory);

  return (
    <div>
      {expensesByTravel.length > 0 && (
        <div className="flex items-center justify-center">
          <div>
            <Doughnut
              data={{
                labels: labels,
                datasets: [
                  {
                    data: data,
                    backgroundColor: [
                      'rgba(43,63,229,0.8)',
                      'rgba(250,192,19,0.8)',
                      'rgba(253,135,135,0.8)',
                      'rgba(80,200,120,0.8)',
                      'rgba(255,99,132,0.8)',
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Chart;
