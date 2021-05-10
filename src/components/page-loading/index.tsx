import TypedSpan from '@/components/typed-span';

import styles from './page-loading.module.scss';

const PageLoading = () => (
  <div className={styles['page-loading-box']}>
    <TypedSpan strings="Loading................................." />
  </div>
);

export default PageLoading;
