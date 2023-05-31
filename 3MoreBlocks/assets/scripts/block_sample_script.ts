import { _decorator, Component, geometry, PhysicsSystem, Node, Color, Sprite, math, SystemEvent, SystemEventType,  RigidBody2D,  BoxCollider2D, Contact2DType, Vec2, random, Graphics, UITransform, UI, SpriteFrame, RigidBody, BoxCollider, director, Director, Layout, Vec3, Line, PhysicsSystem2D, nextPow2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('block_sample_script')
export class block_sample_script extends Component {

    public color: Color;
    public height: number = 50;
    public widht: number = 50;

    private down_speed: number = 0;
    private rigidbody: RigidBody2D;

    init() {
        const colors = [Color.RED, Color.GREEN, Color.BLUE];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        const graphis = this.node.addComponent(Graphics);
        graphis.fillColor = this.color;
        graphis.lineWidth = 0;
        graphis.rect(0, 0, this.height, this.widht);
        graphis.fill();
   
        const trans = this.node.getComponent(UITransform);
        trans.setContentSize(this.height, this.widht);
        trans.setAnchorPoint(0, 0);

        const collider = this.node.addComponent(BoxCollider2D);
        collider.size.height = this.height;
        collider.size.width = this.widht;

        this.rigidbody = this.node.addComponent(RigidBody2D);
        this.rigidbody.type = 3;
        this.rigidbody.fixedRotation = true;

        this.node.on(Node.EventType.MOUSE_UP, this.onClickEvent, this);
    }

    update(deltaTime: number) {
        this.rigidbody.applyForceToCenter(new Vec2(0, -1 * this.down_speed), true);
    }

    onClickEvent() {
        let list: Node[] = [];
        this.findNeighbours(list, this.color);
        console.log("test");
        if (list.length > 2) {
            list.forEach((child) => {
                child.destroy();
            });
        }
    }

    findNeighbours(list: Node[], start_color: Color) {
        let closest_neighbour: Node[] = [];
        
        const worldPos = this.node.getWorldPosition();
        
        const ray = new geometry.Ray(worldPos.x, worldPos.y, worldPos.z, worldPos.x, worldPos.y, worldPos.z);
        const mask = 0xffffffff;
        const maxDistance = this.height;
        const queryTriger = true;
        for (let i = 1; i < 3; i++) {
            for (let j = 1; j < 3; j++) {
                ray.d.x = worldPos.x + (this.widht * Math.pow(-1, i));
                ray.d.y = worldPos.y + (this.height * Math.pow(-1, j));
                if (PhysicsSystem.instance.raycast(ray, mask, maxDistance, queryTriger)) {
                    const result = PhysicsSystem.instance.raycastResults;
                    result.forEach((iter) => {
                        const node_component = iter.collider.node.getComponent(block_sample_script);
                        if (node_component && node_component.color == start_color) {
                            closest_neighbour.push(iter.collider.node);
                        }
                    });
                }
            }
        }
        closest_neighbour.forEach((child) => {
            if (list.indexOf(child) === -1) {
                list.push(child);
                child.getComponent(block_sample_script).findNeighbours(list, start_color);
            }
        });
    }
}

