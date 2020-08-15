//import styles from './layout.module.scss'

export default function Layout({ children, myClass }) {
	let c ="cover-container d-flex w-100 h-100 mx-auto flex-column";
	if(myClass){
		c += " " + myClass;
	}
  return <div className={c}>{children}</div>
}
