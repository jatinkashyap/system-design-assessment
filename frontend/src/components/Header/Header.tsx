import { FiSearch, FiUser, FiMenu } from 'react-icons/fi'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button className={styles.menuBtn}>
          <FiMenu size={20} />
        </button>
        <div className={styles.logo}>
          <span className={styles.logoText}>Youtube Clone</span>
        </div>
      </div>

      <div className={styles.headerCenter}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
          <button className={styles.searchBtn}>
            <FiSearch size={18} />
          </button>
        </div>
        
      </div>

      <div className={styles.headerRight}>
        <button className={styles.profileBtn}>
          <FiUser size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header