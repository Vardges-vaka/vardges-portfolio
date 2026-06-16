import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";

/**
 * The actual WebGL scene (loaded lazily by Hero3D). A slowly rotating low-poly
 * object — an icosahedral "network node" for tech, a wireframe cocktail glass
 * for hospitality. Kept tiny: a couple of meshes, capped DPR, two lights.
 */
const Spinner = ({ variant, color }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += delta * 0.45;
    g.rotation.x += delta * 0.12;
  });

  return (
    <group ref={ref}>
      {variant === "bar" ? (
        <>
          {/* bowl */}
          <mesh position={[0, 0.55, 0]}>
            <coneGeometry args={[1.05, 1.15, 7, 1, true]} />
            <meshStandardMaterial color={color} wireframe />
          </mesh>
          {/* stem */}
          <mesh position={[0, -0.45, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 1.1, 8]} />
            <meshStandardMaterial color={color} wireframe />
          </mesh>
          {/* foot */}
          <mesh position={[0, -1.05, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.05, 18]} />
            <meshStandardMaterial color={color} wireframe />
          </mesh>
        </>
      ) : (
        <>
          <mesh>
            <icosahedronGeometry args={[1.15, 0]} />
            <meshStandardMaterial color={color} wireframe />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
          </mesh>
        </>
      )}
    </group>
  );
};

Spinner.propTypes = {
  variant: PropTypes.oneOf(["tech", "bar"]).isRequired,
  color: PropTypes.string.isRequired,
};

const Hero3DScene = ({ variant, color, active = true }) => (
  <Canvas
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 4.2], fov: 45 }}
    gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    frameloop={active ? "always" : "never"}
    style={{ width: "100%", height: "100%" }}
  >
    <ambientLight intensity={0.7} />
    <pointLight position={[3, 3, 4]} intensity={1.3} />
    <Spinner variant={variant} color={color} />
  </Canvas>
);

Hero3DScene.propTypes = {
  variant: PropTypes.oneOf(["tech", "bar"]).isRequired,
  color: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default Hero3DScene;
