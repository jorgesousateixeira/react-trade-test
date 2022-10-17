import {animated, useSpring} from 'react-spring';

export function Fade(props: any) {
    const { children } = props;

    const animationProperties = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: {
            duration: 1500,
        },
    });

    return (<animated.div style={animationProperties}>{ children }</animated.div>);
}
