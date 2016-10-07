@extends('layouts.master')

@section('content')

    <h1>Childgiftcard <a href="{{ url('childgiftcard/create') }}" class="btn btn-primary pull-right btn-sm">Add New Childgiftcard</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>Card Id</th><th>House Id</th><th>Child Id</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($childgiftcard as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('childgiftcard', $item->id) }}">{{ $item->card_id }}</a></td><td>{{ $item->house_id }}</td><td>{{ $item->child_id }}</td>
                    <td>
                        <a href="{{ url('childgiftcard/' . $item->id . '/edit') }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'url' => ['childgiftcard', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $childgiftcard->render() !!} </div>
    </div>

@endsection
