import { _decorator, Component, Node, systemEvent, SystemEventType, Label, resources, Prefab, error, } from 'cc';
import { block_sample_script } from '../scripts/block_sample_script';
const { ccclass, property } = _decorator;

@ccclass('create_lvl')
export class create_lvl extends Component {
    @property({ type: Label })
    private rowsLabel: Label | null = null;
    @property({ type: Label })
    private colsLabel: Label | null = null;
    @property({ type: Node })
    private nodeContainer: Node | null = null;
    start() {
        this.createLvl(10, 16);
    }

    createLvl(rows: number, cols: number) {
        let on_disp_height = 50;
        let on_disp_widht = 50;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                var newNode = new Node;
                const component = newNode.addComponent(block_sample_script);
                component.height = on_disp_height;
                component.widht = on_disp_widht;
                newNode.setPosition(on_disp_widht * j, on_disp_widht * i);
                component.init();
                this.nodeContainer.addChild(newNode);
            }
        }
    }
}


