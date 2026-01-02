import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Eraser, Pen, Download, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';

const Tactics = () => {
    const canvasRef = useRef(null); // Court layer
    const drawingCanvasRef = useRef(null); // Drawing layer (persistent)
    const containerRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('pen'); // pen, eraser
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(6);

    const LINE_COLOR = '#000000';

    useEffect(() => {
        drawCourt();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleResize = () => {
        // Save current drawings
        const drawingCanvas = drawingCanvasRef.current;
        const tempCanvas = document.createElement('canvas');
        if (drawingCanvas) {
            tempCanvas.width = drawingCanvas.width;
            tempCanvas.height = drawingCanvas.height;
            tempCanvas.getContext('2d').drawImage(drawingCanvas, 0, 0);
        }

        // Redraw court
        drawCourt();

        // Restore drawings
        if (drawingCanvas && containerRef.current) {
            drawingCanvas.width = containerRef.current.offsetWidth;
            drawingCanvas.height = containerRef.current.offsetHeight;
            drawingCanvas.getContext('2d').drawImage(tempCanvas, 0, 0);
        }
    };

    const drawCourt = () => {
        const canvas = canvasRef.current;
        const drawingCanvas = drawingCanvasRef.current;
        if (!canvas || !containerRef.current) return;
        const ctx = canvas.getContext('2d');
        const container = containerRef.current;

        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        // Initialize drawing canvas with same dimensions
        if (drawingCanvas) {
            drawingCanvas.width = container.offsetWidth;
            drawingCanvas.height = container.offsetHeight;
        }

        const w = canvas.width;
        const h = canvas.height;

        // Colors
        const BG_COLOR = '#d0dbe9';
        const LINE_COLOR = '#1a252f';

        // Background
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';

        // Margins
        const m = 20;
        const cW = w - (2 * m);
        const cH = h - (2 * m);

        // 1. Boundary
        ctx.strokeRect(m, m, cW, cH);

        // 2. Center Circle (Right Side)
        const centerRadius = cH * 0.12;
        ctx.beginPath();
        ctx.arc(m + cW, m + cH / 2, centerRadius, Math.PI / 2, 3 * Math.PI / 2);
        ctx.stroke();

        // 3. Key Area (Paint) - NARROWER as requested
        const keyHeight = cH * 0.26; // Reduced from 0.33 to make it narrower
        const keyDepth = cW * 0.55; // Extended to match FT circle position
        const keyY = m + (cH - keyHeight) / 2;
        const keyX = m;

        // Outer Key Rectangle
        ctx.strokeRect(keyX, keyY, keyDepth, keyHeight);

        // Inner Free Throw Circle - CENTER ALIGNED WITH FREE THROW LINE
        const ftRadius = keyHeight * 0.28;
        const ftCenterX = keyX + keyDepth; // Circle center at the right edge of the key (free throw line)
        const ftCenterY = m + cH / 2;

        ctx.beginPath();
        ctx.arc(ftCenterX, ftCenterY, ftRadius, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.setLineDash([10, 10]);
        ctx.arc(ftCenterX, ftCenterY, ftRadius, Math.PI / 2, 3 * Math.PI / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Small restricted area arc
        const raRadius = keyHeight * 0.15;
        const basketX = m + (cW * 0.08);
        ctx.beginPath();
        ctx.arc(basketX, ftCenterY, raRadius, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();

        // 4. Three Point Line - CLOSER TO CENTER CIRCLE
        const threePtMarginY = cH * 0.06;
        const threePtStraightLen = cW * 0.15;

        // Top line
        ctx.beginPath();
        ctx.moveTo(m, m + threePtMarginY);
        ctx.lineTo(m + threePtStraightLen, m + threePtMarginY);
        ctx.stroke();

        // Bottom line
        ctx.beginPath();
        ctx.moveTo(m, m + cH - threePtMarginY);
        ctx.lineTo(m + threePtStraightLen, m + cH - threePtMarginY);
        ctx.stroke();

        // Arc connecting them - MOVED CLOSER TO CENTER (0.85 instead of 0.75)
        ctx.beginPath();
        ctx.moveTo(m + threePtStraightLen, m + threePtMarginY);

        const arcPeakX = m + (cW * 0.85); // Moved closer to center circle

        ctx.bezierCurveTo(
            arcPeakX, m + threePtMarginY,
            arcPeakX, m + cH - threePtMarginY,
            m + threePtStraightLen, m + cH - threePtMarginY
        );
        ctx.stroke();

        // 5. Basket & Backboard
        const backboardHeight = keyHeight * 0.4;

        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(basketX, ftCenterY - backboardHeight / 2);
        ctx.lineTo(basketX, ftCenterY + backboardHeight / 2);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m, ftCenterY - backboardHeight / 3);
        ctx.lineTo(basketX, ftCenterY - backboardHeight / 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(m, ftCenterY + backboardHeight / 3);
        ctx.lineTo(basketX, ftCenterY + backboardHeight / 3);
        ctx.stroke();

        // Rim
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#e67e22';
        ctx.beginPath();
        ctx.arc(basketX + 5, ftCenterY, 6, 0, Math.PI * 2);
        ctx.stroke();

        // Key Markings
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 3;
        const marks = [0.25, 0.45, 0.65, 0.85];
        marks.forEach(mk => {
            const mkX = keyX + (keyDepth * mk);
            ctx.beginPath(); ctx.moveTo(mkX, keyY); ctx.lineTo(mkX, keyY - 5); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(mkX, keyY + keyHeight); ctx.lineTo(mkX, keyY + keyHeight + 5); ctx.stroke();
        });


        // Restore Drawing State
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
    };

    // Drawing Logic
    const getPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        const pos = getPos(e);

        // Start drawing on the drawing layer
        setIsDrawing(true);
        const ctx = drawingCanvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.strokeStyle = tool === 'eraser' ? '#d0dbe9' : color; // Use court color for eraser
        ctx.lineWidth = tool === 'eraser' ? 30 : lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    };

    const draw = (e) => {
        if (!isDrawing) return;
        if (e.cancelable) e.preventDefault();
        const pos = getPos(e);
        const ctx = drawingCanvasRef.current.getContext('2d');
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearDrawings = () => {
        const drawingCanvas = drawingCanvasRef.current;
        if (drawingCanvas) {
            const ctx = drawingCanvas.getContext('2d');
            ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        }
    };

    const saveImage = async () => {
        if (!canvasRef.current) return;
        try {
            const canvas = await html2canvas(canvasRef.current);
            const link = document.createElement('a');
            link.download = `pizarra-basket-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tactics-view" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>

            {/* TOOLBAR */}
            <div className="glass-panel" style={{ padding: '0.8rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className={`btn ${tool === 'pen' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => { setTool('pen'); setColor('#000000'); }}
                        title="Lápiz"
                    >
                        <Pen size={20} /> <span className="hide-mobile">Lápiz</span>
                    </button>
                    <button
                        className={`btn ${tool === 'eraser' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setTool('eraser')}
                        title="Borrador"
                    >
                        <Eraser size={20} /> <span className="hide-mobile">Borrador</span>
                    </button>

                    <div style={{ width: '1px', background: 'var(--border)', margin: '0 5px' }}></div>

                    {['#000000', '#c0392b', '#27ae60', '#2980b9'].map(c => (
                        <div
                            key={c}
                            onClick={() => { setColor(c); setTool('pen'); }}
                            style={{
                                width: '24px', height: '24px', borderRadius: '50%', background: c,
                                cursor: 'pointer', border: color === c ? '2px solid var(--text-main)' : '1px solid #ccc',
                                transform: color === c ? 'scale(1.2)' : 'scale(1)'
                            }}
                        />
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className="btn btn-secondary"
                        onClick={clearDrawings}
                        style={{ color: 'var(--error)', borderColor: 'var(--error)' }}
                        title="Borrar Todo"
                    >
                        <RotateCcw size={20} /> <span className="hide-mobile">Limpiar</span>
                    </button>
                    <button className="btn btn-secondary" onClick={saveImage} title="Guardar Imagen">
                        <Download size={20} />
                    </button>
                </div>
            </div>

            {/* WHITEBOARD CANVAS */}
            <div
                ref={containerRef}
                className="glass-panel"
                style={{
                    flex: 1,
                    padding: '0',
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                {/* Court and Ball Layer (bottom) */}
                <canvas
                    ref={canvasRef}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
                {/* Drawing Layer (top) */}
                <canvas
                    ref={drawingCanvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        cursor: tool === 'pen' ? 'crosshair' : 'cell',
                        touchAction: 'none'
                    }}
                />
            </div>
        </motion.div>
    );
};

export default Tactics;
