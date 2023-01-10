import style from '../../styles/index.module.scss';

const Menu: React.FC<any> = ({ menulist }) => {
    return <div className={style['menu']}>
        <div className={style['menu-logo']}>
            <img src="https://glginc.cn/assets/img/zh-hans-logo-white.781e2926.svg" />
        </div>
        <div className={style['menu-list']}>
            <ul className={style['menu-ul']}>
                {menulist?.map((el: any) => (<li key={el.name}>{el.name}</li>))}
            </ul>
        </div>
    </div >
}

export default Menu;