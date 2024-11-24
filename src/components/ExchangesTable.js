import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ExchangeTable({ exchanges }) {
  const t = useTranslations('affiliated');
  const columns = ['exchangeName', 'cashbackRate', 'tradingDiscount', 'averageRebate', 'limitPrice', 'marketPrice'];

  return (
    <div className="w-full bg-background-1">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t('tableTitle')}</h2>
          <p className="text-gray-600 text-sm md:text-base mt-1">{t('tableSubtitle')}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {t(`columns.${column}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {exchanges.map((exchange) => (
                  <tr key={exchange.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                            className="h-10 w-10 rounded-full object-cover"
                            src={exchange.imageUrl}
                            alt={exchange.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{exchange.name}</div>
                          <div className="text-sm text-gray-500">{exchange.label}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-primary-1 font-semibold">{exchange.cashback}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-primary-1 font-semibold">{exchange.discount ?? '-'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">${exchange.averageRebate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">{exchange.limitPrice}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">{exchange.marketPrice}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {exchanges.map((exchange) => (
              <div key={exchange.id} className="p-4 space-y-4">
                <div className="flex items-center">
                  <Image
                    className="h-12 w-12 rounded-full object-cover"
                    src={exchange.imageUrl}
                    alt={exchange.name}
                    width={48}
                    height={48}
                  />
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{exchange.name}</div>
                    <div className="text-sm text-gray-500">{exchange.label}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500">{t('columns.cashbackRate')}</p>
                    <p className="text-sm font-semibold text-primary-1">{exchange.cashback}%</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500">{t('columns.tradingDiscount')}</p>
                    <p className="text-sm font-semibold text-primary-1">{exchange.discount ?? '-'}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500">{t('columns.averageRebate')}</p>
                    <p className="text-sm font-semibold">${exchange.averageRebate}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500">{t('columns.limitPrice')}</p>
                    <p className="text-sm font-semibold">{exchange.limitPrice}%</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500">{t('columns.marketPrice')}</p>
                    <p className="text-sm font-semibold">{exchange.marketPrice}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
