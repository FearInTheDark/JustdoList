import React from 'react';

const LoadingOverlay = () => {
    return (
        <div style={styles.overlay}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={100}
                height={100}
                viewBox="0 0 24 24"
            >
                <circle cx={12} cy={12} r={0} fill="#57beff">
                    <animate
                        id="svgSpinnersPulse30"
                        fill="freeze"
                        attributeName="r"
                        begin="0;svgSpinnersPulse32.begin+0.54s"
                        calcMode="spline"
                        dur="1.62s"
                        keySplines=".52,.6,.25,.99"
                        values="0;11"
                    ></animate>
                    <animate
                        fill="freeze"
                        attributeName="opacity"
                        begin="0;svgSpinnersPulse32.begin+0.54s"
                        calcMode="spline"
                        dur="1.62s"
                        keySplines=".52,.6,.25,.99"
                        values="1;0"
                    ></animate>
                </circle>
                <circle cx={12} cy={12} r={0} fill="#57beff">
                    <animate
                        id="svgSpinnersPulse31"
                        fill="freeze"
                        attributeName="r"
                        begin="svgSpinnersPulse30.begin+0.54s"
                        calcMode="spline"
                        dur="1.62s"
                        keySplines=".52,.6,.25,.99"
                        values="0;11"
                    ></animate>
                    <animate
                        fill="freeze"
                        attributeName="opacity"
                        begin="svgSpinnersPulse30.begin+0.54s"
                        calcMode="spline"
                        dur="1.62s"
                        keySplines=".52,.6,.25,.99"
                        values="1;0"
                    ></animate>
                </circle>
                <circle cx={12} cy={12} r={0} fill="#57beff">
                    <animate
                        id="svgSpinnersPulse32"
                        fill="freeze"
                        attributeName="r"
                        begin="svgSpinnersPulse30.begin+1.08s"
                        calcMode="spline"
                        dur="1.62s"
                        keySplines=".52,.6,.25,.99"
                        values="0;11"
                    ></animate>
                    <animate
                        fill="freeze"
                        attributeName="opacity"
                        begin="svgSpinnersPulse30.begin+1.08s"
                        calcMode="spline"
                        dur="1.62s"
                        keySplines=".52,.6,.25,.99"
                        values="1;0"
                    ></animate>
                </circle>
            </svg>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền trong suốt
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
};

export default LoadingOverlay;
