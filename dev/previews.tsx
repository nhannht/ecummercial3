import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import FAQ from "../client/components/shop/FAQ";
import {Section1} from "../client/components/admin/configuration-editors/Landing/Section1";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Section1">
                <Section1/>
            </ComponentPreview>
            <ComponentPreview path="/FAQ">
                <FAQ/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;