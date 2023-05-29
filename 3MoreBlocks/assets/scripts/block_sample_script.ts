import { _decorator, Component, Node, Color, Sprite, systemEvent, SystemEvent, SystemEventType, RigidBody2D, BoxCollider2D, Contact2DType, Vec2, random, Graphics, UITransform, UI, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('block_sample_script')
export class block_sample_script extends Component {

    public color: Color;
    public height: number = 50;
    public widht: number = 50;

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

       // systemEvent.on(SystemEventType.MOUSE_UP, this.onClickEvent, this);

        this.rigidbody = this.node.addComponent(RigidBody2D);
        this.rigidbody.fixedRotation = true;
    }

    onClickEvent() {
        let list: Node[] = [];
        this.findNeighbours(list, this.color);
        if (list.length > 2) {
            list.forEach((child) => {
                child.destroy();
            });
        }
    }

    findNeighbours(list: Node[], start_color: Color) {

        let closest_neighbour: Node[] = [];

        closest_neighbour.push(new Node);
        closest_neighbour.push(new Node);
        closest_neighbour.push(new Node);
        closest_neighbour.push(new Node);

        closest_neighbour.forEach((child) => {
            if (child.getComponent(block_sample_script).color == start_color && list.indexOf(child) === -1) {
                list.push(child);
                child.getComponent(block_sample_script).findNeighbours(list, start_color);
            }
        });
    }
}

