export interface Angles {
    x: number;
    y: number;
}

export interface SphereInterface {
    angles: Angles;
}

export interface SphereFaceInterface {
    opacity: number;
    planeAngle: number;
}

export interface SphereElementInterface {
    opacity: number;
    insideAngle: number;
}

export interface AfterInterface {
    opacity: number;
    insideAngle: number;
    planeAngle: number;
}
