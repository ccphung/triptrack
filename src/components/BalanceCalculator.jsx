import { CheckCheckIcon } from 'lucide-react';

export default function BalanceCalculator({ expenses, travel }) {
  const { travelers } = travel;

  const totalPerPerson = travelers.reduce((acc, traveler) => {
    const total = expenses
      .filter((expense) => expense.payer === traveler)
      .reduce((sum, expense) => {
        const expenseInEur =
          expense.selectedCurrency !== 'EUR'
            ? expense.price / expense.exchangeRate
            : expense.price;
        return sum + Number(expenseInEur);
      }, 0);

    acc[traveler] = total;
    return acc;
  }, {});

  const totalArray = Object.entries(totalPerPerson).map(([name, total]) => ({
    name,
    total,
  }));

  const totalPaid = totalArray.reduce((acc, t) => acc + t.total, 0);
  const averagePerPerson = totalPaid / totalArray.length;

  const maxExpensePerson = totalArray.filter((t) => t.total > averagePerPerson);

  const minExpensePerson = totalArray.filter((t) => t.total < averagePerPerson);

  const allPaidSameAmount = totalArray.every(
    (t) => t.total === averagePerPerson,
  );

  if (allPaidSameAmount && expenses.length > 0) {
    return (
      <div className="flex justify-center text-green-800">
        <CheckCheckIcon />
        <p>Tous les participants ont payé le même montant.</p>
      </div>
    );
  }

  return (
    <div>
      {minExpensePerson.map((t) => {
        const totalDebt = averagePerPerson - t.total;
        const totalMaxPaying = maxExpensePerson.reduce(
          (acc, p) => acc + (p.total - averagePerPerson),
          0,
        );

        return (
          <div key={t.name}>
            <p>
              {maxExpensePerson.map((p) => {
                const amount =
                  (totalDebt * (p.total - averagePerPerson)) / totalMaxPaying;
                return (
                  <span key={p.name}>
                    {t.name} doit à {p.name}: {amount.toFixed(2)} €
                    <br />
                  </span>
                );
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
}
