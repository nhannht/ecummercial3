import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import FAQ from "../client/components/shop/FAQ";
import EditSection1Config from "../client/components/admin/configuration-editors/Landing/Section1";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Section1">
                <EditSection1Config  />
            </ComponentPreview>
            <ComponentPreview path="/FAQ">
                <FAQ/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;