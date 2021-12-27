import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AfterInterface, Angles, SphereElementInterface, SphereFaceInterface, SphereInterface } from './interfaces';
import './ElSphere.scss';

const NUM_PLANES = 2,
    NUM_EL_PER_PLANE = 4;

const elements = [...Array(NUM_PLANES * NUM_EL_PER_PLANE)].map((_) => Math.floor(Math.random() * 20));

const Styled = {
    Sphere: styled.div.attrs<SphereInterface>(({ angles }) => ({
        style: {
            transform: `rotateX(${angles.y}deg) rotateY(${angles.x}deg)`,
        },
    }))<SphereInterface>`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transform-style: preserve-3d;
    `,
    SphereFace: styled.div<SphereFaceInterface>`
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transform-style: preserve-3d;
        transform: ${(props) => `rotateY(${props.planeAngle}deg)`};
        /* opacity: 1; */
    `,
    SphereEl: styled.div.attrs<SphereElementInterface>(({ opacity, planeAngle, insideAngle }) => ({
        style: {
            transform: `rotateZ(${insideAngle}deg)`,
            borderColor: `rgb(255, 255, 255, ${opacity})`,
        },
    }))<SphereElementInterface>`
        width: 0;
        height: 50%;
        left: 0;
        right: 0;
        margin: auto;
        position: absolute;
        transform-origin: bottom;
        transform-style: preserve-3d;
        border: 1px dotted;
        box-sizing: border-box;
        font: bold;
        color: rgb(255, 255, 255);
    `,
    After: styled.div.attrs<AfterInterface>(({ opacity }) => ({
        style: {
            opacity: opacity,
        },
    }))<AfterInterface>`
        font-size: 30px;
        position: absolute;
        background-color: rgb(194, 24, 24);
        height: 15px;
        width: 15px;
        border-radius: 50%;
        display: inline-block;
        top: 0;
        left: 0;
        transform: scale(-1, 1) rotateX(90deg) rotateZ(90deg);
        user-select: none;
    `,
};

const ElSphere: React.FC = () => {
    const renderCountRef = useRef(0);
    const [mouseState, setMouseState] = useState(false);
    const [angles, setAngles] = useState<Angles>({ x: 0, y: 0 });

    const handleMouseClick = (e: React.MouseEvent) => {
        switch (e.type) {
            case 'mousedown':
                setMouseState(true);
                break;
            case 'mouseup':
                setMouseState(false);
                break;
        }
    };

    const handleMove = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (mouseState) {
            renderCountRef.current++;
            if (renderCountRef.current === 3) {
                renderCountRef.current = 0;

                const { movementX, movementY } = e;
                const newX = angles.x - movementX;
                const newY = angles.y - movementY;
                // console.log('X:' + newX + ' ' + newY);

                setAngles({
                    x: Math.abs(newX) > 360 ? 0 : newX,
                    y: Math.abs(newY) > 360 ? 0 : newY,
                });
            }
        }
    };

    const renderEl = () => {
        const planeList: JSX.Element[] = [];
        let elCount = 0;

        // Create each plane
        for (let i = 0; i < NUM_PLANES; i++) {
            const ang = i * (360 / NUM_PLANES);
            const opacity = (1 - Math.sin(((ang - angles.x) / 180) * Math.PI)) / 2;

            // Create the plane itens
            const list: JSX.Element[] = [];
            for (let k = 1; k <= NUM_EL_PER_PLANE; k++) {
                const insideAngle = k * (180 / NUM_EL_PER_PLANE - 10);

                list.push(
                    <Styled.SphereEl
                        key={k}
                        draggable="false"
                        planeAngle={0}
                        opacity={opacity}
                        insideAngle={insideAngle}
                    >
                        <Styled.After opacity={opacity}>{elements[elCount]}</Styled.After>
                    </Styled.SphereEl>,
                );
                elCount++;
            }

            planeList.push(
                <Styled.SphereFace key={i} draggable="false" planeAngle={ang} opacity={opacity}>
                    {list}
                </Styled.SphereFace>,
            );
        }
        return planeList;
    };

    return (
        <div
            className="ElSphere"
            onMouseDown={handleMouseClick}
            onMouseUp={handleMouseClick}
            onMouseMove={handleMove}
            draggable="false"
        >
            <Styled.Sphere angles={angles} className="sphere" draggable="false">
                {renderEl()}
            </Styled.Sphere>
        </div>
    );
};

export default ElSphere;
