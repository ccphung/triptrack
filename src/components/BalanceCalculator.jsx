import { CheckCheckIcon } from 'lucide-react';

export default function BalanceCalculator({ expenses, travel }) {
  const { travelers } = travel[0];
  console.log(travelers);

  const totalByPerson = travelers.reduce((acc, traveler) => {
    const total = expenses
      .filter((expense) => expense.payer === traveler)
      .reduce((sum, expense) => sum + Number(expense.price), 0);

    acc[traveler] = total;
    return acc;
  }, {});

  const totalArray = Object.entries(totalByPerson).map(([name, total]) => ({
    name,
    total,
  }));

  const averagePerPerson =
    totalArray.reduce((acc, t) => acc + t.total, 0) / totalArray.length;

  const maxExpensePerson = totalArray.filter((t) => t.total > averagePerPerson);

  const allPaidSameAmount = totalArray.every(
    (t) => t.total === averagePerPerson,
  );

  if (allPaidSameAmount) {
    return (
      <div className="flex justify-center text-green-800">
        <CheckCheckIcon />
        <p>Tous les participants ont payé le même montant.</p>
      </div>
    );
  }

  return (
    <div>
      {totalArray.map((t) => {
        if (t.total < averagePerPerson) {
          const totalDebt = averagePerPerson - t.total;

          const totalMaxPaying = maxExpensePerson.reduce(
            (acc, p) => acc + p.total,
            0,
          );

          return (
            <div key={t.name}>
              <p>
                {maxExpensePerson.map((p) => {
                  const amount = (totalDebt * p.total) / totalMaxPaying;
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
        }
        return null;
      })}
    </div>
  );
}
