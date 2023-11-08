import { Reader } from "../Reader";

test('reader basic', () => {
    const reader = new Reader('123');
    
    expect(reader.current()).toBe('1');
    expect(reader.row()).toBe(0);
    expect(reader.col()).toBe(0);
    expect(reader.isFinish()).toBe(false);
    reader.forward();

    expect(reader.current()).toBe('2');
    expect(reader.row()).toBe(0);
    expect(reader.col()).toBe(1);
    expect(reader.isFinish()).toBe(false);
    reader.forward();

    expect(reader.current()).toBe('3');
    expect(reader.row()).toBe(0);
    expect(reader.col()).toBe(2);
    expect(reader.isFinish()).toBe(false);
    reader.forward();
});

test('reader finish', () => {
    const reader = new Reader('123');
    
    reader.forward();
    reader.forward();
    reader.forward();

    expect(reader.current()).toBe(undefined);
    expect(reader.isFinish()).toBe(true);
});

test('reader multi line', () => {
    const reader = new Reader('123\n456\n\n');
    
    reader.forward();
    reader.forward();
    reader.forward();

    expect(reader.current()).toBe('\n');
    expect(reader.row()).toBe(0);
    expect(reader.col()).toBe(3);

    reader.forward();

    expect(reader.current()).toBe('4');
    expect(reader.row()).toBe(1);
    expect(reader.col()).toBe(0);

    reader.forward(); // 5
    reader.forward(); // 6
    reader.forward(); // \n

    expect(reader.current()).toBe('\n');
    expect(reader.row()).toBe(1);
    expect(reader.col()).toBe(3);

    reader.forward();

    expect(reader.current()).toBe('\n');
    expect(reader.row()).toBe(2);
    expect(reader.col()).toBe(0);

    reader.forward();
    expect(reader.current()).toBe(undefined);
    expect(reader.isFinish()).toBe(true);
});

test('reader Hangeul col', () => {
    const reader = new Reader('가나다');
    
    expect(reader.current()).toBe('가');
    expect(reader.col()).toBe(0);
    reader.forward();

    expect(reader.current()).toBe('나');
    expect(reader.col()).toBe(1);
    reader.forward();

    expect(reader.current()).toBe('다');
    expect(reader.col()).toBe(2);
    reader.forward();
});