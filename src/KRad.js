import React from "react";
import { fabric } from "fabric";

function rotate(pie, angle) {
  const objectOrigin = new fabric.Point(pie.left, pie.top);
  const newOrigin = fabric.util.rotatePoint(
    objectOrigin,
    new fabric.Point(200, 200),
    fabric.util.degreesToRadians(angle)
  );

  pie.left = newOrigin.x;
  pie.top = newOrigin.y;
  pie.angle = angle;
}

export default function KRad({ members = [] }) {
  React.useEffect(() => {
    const canvas = new fabric.StaticCanvas("c");

    if (members.length <= 1) {
      return;
    }
    const COLOR_STACK = [
      "#024873",
      "#0FA697",
      "#F2C53D",
      "#BF814B",
      "#591202",
      "#1B91BF",
      "#F2B035",
      "#F2AB91",
    ];
    const CANVAS_WIDTH = 400;
    const CANVAS_HALF_WIDTH = CANVAS_WIDTH / 2;
    const PIE_RADIUS = 195;
    const FULL_CIRCLE = 2 * Math.PI;
    const nextX =
      CANVAS_HALF_WIDTH + Math.cos(FULL_CIRCLE / members.length) * PIE_RADIUS;
    const nextY =
      CANVAS_HALF_WIDTH - Math.sin(FULL_CIRCLE / members.length) * PIE_RADIUS;

    const ANGLE_INCREMENT = members.length > 1 ? 360.0 / members.length : 0;
    // PIES
    members.forEach((member, i) => {
      const pie = new fabric.Path(
        `M 200,200 L ${
          CANVAS_HALF_WIDTH + PIE_RADIUS
        },200 A ${PIE_RADIUS}, ${PIE_RADIUS} 1,0,0 ${nextX},${nextY} Z`,
        {
          fill: COLOR_STACK[i],
          opacity: 1,
        }
      );
      rotate(pie, -180 + ANGLE_INCREMENT / 2 + ANGLE_INCREMENT * i);
      canvas.add(pie);
    });
    // TEXTS
    members.forEach((member, i) => {
      const text = new fabric.Text(`${member}   `, {
        fill: "white",
        originX: "right",
        originY: "center",
        angle: ANGLE_INCREMENT * i,
        left: CANVAS_HALF_WIDTH,
        top: CANVAS_HALF_WIDTH,
      });
      canvas.add(text);
    });
  }, [members]);
  const [rotation, setRotation] = React.useState(0);
  const [className, setClassName] = React.useState("");

  return (
    <>
      <div className="message-balloon">
        Touch me! for a spin
      </div>
      <canvas
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={() => {
          setClassName("animating");
          setRotation(rotation + Math.random() * 360 * 5);
        }}
        onTransitionEnd={() => {
          setClassName("");
          setRotation(rotation % 360);
        }}
        id="c"
        className={className}
        width="400"
        height="400"
      ></canvas>
    </>
  );
}
