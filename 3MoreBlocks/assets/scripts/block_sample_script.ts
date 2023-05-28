import { _decorator, Component, Node, Color, systemEvent, SystemEvent, SystemEventType, RigidBody2D, BoxCollider2D, Contact2DType, Vec2, random, Graphics } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('block_sample_script')
export class block_sample_script extends Component {

    public color: Color;
    public height: number = 50;
    public widht: number = 50;

    private rigidbody: any;
    private walk_force: number = 100;

    constructor(height: number, widht: number) {
        super();
        this.height = height;
        this.widht = widht;
    }

    onLoad() {
        // выбор рандомного цвета
        const colors = [Color.RED, Color.GREEN, Color.BLUE];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        // создание примитивного квадрата
        const rectangleNode = new Node('Rectangle');
        this.node.addChild(rectangleNode);
        const graphicsComponent = rectangleNode.addComponent(Graphics);
        graphicsComponent.rect(0, 0, this.height, this.widht);
        graphicsComponent.fillColor = this.color;
        // привязка события
        systemEvent.on(SystemEventType.MOUSE_UP, this.onClickEvent, this);
    }

    start() {
        this.rigidbody = this.node.getComponent(RigidBody2D);
    }

    update(deltaTime: number) {
        this.rigidbody.applyForceCenter(new Vec2(0, -1 * this.walk_force), true);
    }

    onClickEvent() {
        let list: Node[] = [];
        list = this.findNeighbours(list, this.color);
        if (list.length > 2) {
            list.forEach((child) => {
                child.destroy();
            });
        }

    }

    findNeighbours(list: Node[], start_color: Color) : Node[] {

        // получить список 4 соседей.
        let closest_neighbour: Node[] = [];

        closest_neighbour.push(new Node);
        closest_neighbour.push(new Node);
        closest_neighbour.push(new Node);
        closest_neighbour.push(new Node);

        closest_neighbour.forEach((child) => {
            if (child.getComponent(block_sample_script).color != start_color || list.indexOf(child) === -1) { // цвета не совпадают или данный сосед уже не добавлен
                //remove node or not add in
            }
        });

        if (closest_neighbour.length == 0) {
            return null;
        } else {

    
            list = list.concat(closest_neighbour);
            ///вызвать функции поиска у соседей и проверить их на null
            closest_neighbour.forEach((child) => {

            });
            return list;
        }

    }
}

