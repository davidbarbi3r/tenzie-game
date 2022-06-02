
export default function Dice(props) {
    let styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
            <div className="dice" style={styles} onClick={props.holdDice}>
                {props.value}
                {console.log()}
            </div>
    )
}