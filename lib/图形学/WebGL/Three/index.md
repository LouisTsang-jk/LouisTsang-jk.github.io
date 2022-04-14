# Three.js

## 概念

### 场景

- Fog
- FogExp2
- Scene

### 摄像机

- PerspectiveCamera(透视摄像机)
- OrthographicCamera

### 渲染器

- CanvasRenderer
- WebGLRenderer
- WebGLRenderTarget
- WebGLRenderTargetCube
- WebGLShaders「着色器」
  > 场景、摄像机、渲染器 三者可以构成最简单的三维场景

### 形状

- CircleGeometry
- ConvexGeometry
- CubeGeometry
- CylinderGeometry
- ExtrudeGeometry
- IcosahedronGeometry
- LatheGeometry
- OctahedronGeometry
- ParametricGeometry
- PlaneGeometry
- PolyhedronGeometry
- ShapeGeometry
- SphereGeometry
- TetrahedronGeometry
- TextGeometry
- TorusGeometry
- TorusKnotGeometry
- TubeGeometry

### 纹理

- CompressedTexture
- DataTexture
- Texture

### 材质

- Meterial
- LineBasicMaterial
- LineDashedMaterial
- MeshBasicMaterial
- MeshDepthMaterial
- MeshFaceMaterial
- MeshLambertMaterial
- MeshNormalMaterial
- MeshPhongMaterial
- ParticleBasicMaterial
- ParticleCanvasMaterial
- ParticleDOMMaterial
- ShaderMaterial
- SpriteMaterial

### 光源

- AmbientLight
- AreaLight
- DirectionalLight
- HemisphereLight
- PointLight
- SpotLight(点光源)

### 加载器

- BinaryLoader
- GeometryLoader
- ImageLoader
- JSONLoader
- LoadingMonitor
- SceneLoader
- TextureLoader

## 优化手段

### 常规型

- WebWorker
- 图片压缩
- IndexDB 存储模型

### 技巧型

- 共用材质和形状
- 模型 remove 之后 dispose
- merge 合并不需要操作的模型
- 循环渲染前做判断或者添加消抖
- BufferGeometry

### 三方工具

- gltf-pipeline 模型压缩
