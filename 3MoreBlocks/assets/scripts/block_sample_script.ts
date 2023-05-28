import { _decorator, Component, Node, Color, systemEvent, SystemEvent, SystemEventType, RigidBody2D, BoxCollider2D, Contact2DType, Vec2, random, Graphics } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('block_sample_script')
export class block_sample_script extends Component {

    public color: Color;
    public height: number = 50;
    public widht: number = 50;

    private rigidbody: any;
    private walk_force: number = 0.1;

    init() {
        const colors = [Color.RED, Color.GREEN, Color.BLUE];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        const graphicsComponent = this.node.addComponent(Graphics);
        graphicsComponent.rect(0, 0, this.height, this.widht);
        graphicsComponent.fillColor = this.color;

       // systemEvent.on(SystemEventType.MOUSE_UP, this.onClickEvent, this);

        this.rigidbody = this.node.addComponent(RigidBody2D);
    }

    update(deltaTime: number) {
    
       // this.rigidbody.applyForceCenter(new Vec2(0, -1 * this.walk_force), true); // error
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

