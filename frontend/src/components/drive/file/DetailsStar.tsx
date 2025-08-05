import childrenStyles from '../../../css/children.module.css'
import starIcon from '../../../assets/star-enabled.svg'
const styles = Object.assign({}, childrenStyles)
type DetailsStarType = {
    starred: boolean

}
function DetailsStar({starred}: DetailsStarType) {
    return (!starred ? null :
        <div className={styles.star}>
            <img className={styles.starSpin} src={starIcon} alt="" />
        </div>)

}

export default DetailsStar


